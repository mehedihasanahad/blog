<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $limit = request()->limit;
            $search = request()->search;

            $tags = User::when(!empty($search), function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
                $q->orWhere('slug', 'like', "%{$search}%");
            })->orderByDesc('id')
            ->paginate($limit ?? 10);

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($tags)) return response()
            ->commonJSONResponse('Resource not found.', 404, 'failed');

        return response()
            ->commonJSONResponse('Data retrieved successfully', 200, 'success', $tags);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Get User info
     */
    public function getUserInfo() {
        try {
            if (empty(Auth::user()))
                throw new \Exception("Invalid user request");
            $user = User::with(['roles'])->find(Auth::user()->id);
            $user->getPermissionsViaRoles();
        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}", 500, 'error');
        }
        return response()
        ->commonJSONResponse('Login successfully', 200, 'success', $user);
    }

    /**
     * Login through user credentials
     */
    public function login(Request $request) {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);
    
            if (!Auth::attempt($credentials))
                return response()
                ->commonJSONResponse('The provided credentials do not match our records.', 401, 'error');

            $request->session()->regenerate();

            $user = User::with(['roles'])->find(Auth::user()->id);
            $user->getPermissionsViaRoles();

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}", 500, 'error');
        }

        return response()
            ->commonJSONResponse('Login successfully', 200, 'success', $user);
        
    }
}
