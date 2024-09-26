<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        $query = http_build_query([
            'client_id'     => env('GOOGLE_CLIENT_ID'),
            'redirect_uri'  => env('GOOGLE_REDIRECT_URL'),
            'response_type' => 'code',
            'scope'         => 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
            'access_type'   => 'offline',
            'prompt'        => 'consent'
        ]);

        return redirect('https://accounts.google.com/o/oauth2/auth?' . $query);
    }

    public function handleGoogleCallback(Request $request)
    {
        if(array_key_exists('error', $request->all())) {
            return redirect()->intended('/admin/login');
        }
        
        // Get access token from Google
        $response = Http::asForm()->post('https://oauth2.googleapis.com/token', [
            'client_id'     => env('GOOGLE_CLIENT_ID'),
            'client_secret' => env('GOOGLE_CLIENT_SECRET'),
            'redirect_uri'  => env('GOOGLE_REDIRECT_URL'),
            'grant_type'    => 'authorization_code',
            'code'          => $request->code,
        ]);

        $accessToken = $response->json()['access_token'];

        // Get user info from Google
        $userResponse = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken,
        ])->get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json');

        $googleUser = $userResponse->json();

        // Check if user exists, if not, create a new one
        $user = User::firstOrCreate(
            [
                'email' => $googleUser['email'],
                'username' => str_replace(" ", "_", strtolower($googleUser['name']))
            ],
            [
                'bio' => json_encode($googleUser),
                'password' => '',
                'status' => 1
            ]
        );

        if(empty($user->profile_image)) {
            $pic = Http::get($googleUser['picture']);

            if (!file_exists('uploads/admin/user/google')) {
                mkdir('uploads/admin/user/google', 0777, true);
            }
    
            $file_name = '/uploads/admin/user/google/google-'.rand(0, 2000).'.jpg';
    
            file_put_contents($file_name, $pic->body());
    
            $user->profile_image = $file_name;
            $user->save();
        }

        // if user is inactive or blocked 0=inactive; 2=inactive
        if (in_array(($user->status ?? 0), [0, 2]))
            return redirect()->intended('/admin/404');

        // Log the user in
        Auth::login($user);

        // Redirect to the home page or dashboard
        return redirect()->intended('/admin/dashboard');
    }
}
