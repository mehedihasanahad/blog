<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class FacebookController extends Controller
{
    public function redirectToFacebook()
    {
        $query = http_build_query([
            'client_id'     => env('FACEBOOK_CLIENT_ID'),
            'redirect_uri'  => env('FACEBOOK_REDIRECT_URL'),
            'response_type' => 'code',
            'scope'         => 'email',
        ]);

        return redirect('https://www.facebook.com/v14.0/dialog/oauth?' . $query);
    }

    public function handleFacebookCallback(Request $request)
    {
        // Exchange code for access token
        $response = Http::asForm()->post('https://graph.facebook.com/v14.0/oauth/access_token', [
            'client_id'     => env('FACEBOOK_CLIENT_ID'),
            'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
            'redirect_uri'  => env('FACEBOOK_REDIRECT_URL'),
            'code'          => $request->code,
        ]);

        $accessToken = $response->json()['access_token'];

        // Get user info from Facebook
        $userResponse = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken,
        ])->get('https://graph.facebook.com/me?fields=id,name,email');

        $facebookUser = $userResponse->json();

        // Check if the user exists, if not, create a new one
        $user = User::firstOrCreate(
            [
                'email' => $facebookUser['email'],
                'username' => str_replace(" ", "_", strtolower($facebookUser['name']))
            ],
            [
                'bio' => json_encode($facebookUser),
                'password' => '',
                'profile_image' => '',
                'status' => 1
            ]
        );

        // Log the user in
        Auth::login($user);

        // Redirect to the home page or dashboard
        return redirect()->intended('/admin/dashboard');
    }
}
