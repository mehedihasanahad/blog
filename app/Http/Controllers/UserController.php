<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
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

            $users = User::when(!empty($search), function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
                $q->orWhere('slug', 'like', "%{$search}%");
            })->orderByDesc('id')
            ->paginate($limit ?? 10);

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($users)) return response()
            ->commonJSONResponse('Resource not found.', 404, 'failed');

        return response()
            ->commonJSONResponse('Data retrieved successfully', 200, 'success', $users);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreUserRequest $request
     * @return JsonResponse
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        try {
            $validated_data = $request->validated();

            $user = new User();
            $user->username = $validated_data['username'];
            $user->email = $validated_data['email'];
            $user->bio = $validated_data['bio'];
            $user->password = Hash::make($validated_data['password']);
            $user->status = $validated_data['status'];

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($user->save())) return response()
            ->commonJSONResponse('Failed to create new user', 500, 'failed');

        return response()
            ->commonJSONResponse('User created successfully');
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
     * @param UpdateUserRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(UpdateUserRequest $request, string $id): JsonResponse
    {
        try {
            $validated_data = $request->validated();

            $user = User::find(Crypt::decryptString($id));
            $user->username = $validated_data['username'];
            $user->email = $validated_data['email'];
            $user->bio = $validated_data['bio'];
            $user->status = $validated_data['status'];

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($user->save())) return response()
            ->commonJSONResponse('Failed to update the user', 500, 'failed');

        return response()
            ->commonJSONResponse('User updated successfully');
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
