<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\ModelHasRole;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
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

            $users = User::with(['roles'])
                ->when(!empty($search), function($q) use ($search) {
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
            DB::beginTransaction();

            $validated_data = $request->validated();
            $roles = json_decode($validated_data['roles'], true);

            $user = new User();
            $user->username = $validated_data['username'];
            $user->email = $validated_data['email'];
            $user->name = $validated_data['name'];
            $user->bio = $validated_data['bio'];
            $user->password = Hash::make($validated_data['password']);
            $user->status = $validated_data['status'];
            $user->save();

            // Roles added through pivote table
            if (!is_array($roles) || empty($roles)) 
                throw new \Exception("Roles must be array and can't be empty");

            foreach($roles as $role_key => $role) {
                $role_data = Role::find(Crypt::decryptString($role['id_enc']));
                if (!$role_data)
                    throw new \Exception('Invalid role data found');

                $model_has_roles = new ModelHasRole();
                $model_has_roles->model_id = $user->id;
                $model_has_roles->role_id = $role_data->id;
                $model_has_roles->model_type = 'App\Models\User';
                
                if (empty($model_has_roles->save()))
                    throw new \Exception('Failed to create new rol_has_permission pivote record');
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($user->id ?? null)) return response()
            ->commonJSONResponse('Failed to create new user', 500, 'failed');

        DB::commit();

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

            DB::beginTransaction();

            $validated_data = $request->validated();
            $roles = json_decode($validated_data['roles'], true);

            $user = User::find(Crypt::decryptString($id));
            $user->username = $validated_data['username'];
            $user->email = $validated_data['email'];
            $user->name = $validated_data['name'];
            $user->bio = $validated_data['bio'];
            $user->status = $validated_data['status'];
            $user->save();

            // Roles added through pivote table
            if (!is_array($roles) || empty($roles)) 
                throw new \Exception("Roles must be array and can't be empty");

            // remove previous roles
            ModelHasRole::where('model_id', $user->id)->delete();

            foreach($roles as $role_key => $role) {
                $role_data = Role::find(Crypt::decryptString($role['id_enc']));
                if (!$role_data)
                    throw new \Exception('Invalid role data found');

                $model_has_roles = new ModelHasRole();
                $model_has_roles->model_id = $user->id;
                $model_has_roles->role_id = $role_data->id;
                $model_has_roles->model_type = 'App\Models\User';
                
                if (empty($model_has_roles->save()))
                    throw new \Exception('Failed to create new rol_has_permission pivote record');
            }

        } catch (\Exception $e) {
            DB::rollBack();

            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($user->id ?? null)) return response()
            ->commonJSONResponse('Failed to update the user', 500, 'failed');

        DB::commit();
        
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

            $user = User::where([
                'email' => $credentials['email']
            ])->first();
    
            if (empty($user) || empty(Hash::check($credentials['password'], $user->password)))
                return response()
                ->commonJSONResponse('The provided credentials do not match our records.', 401, 'error');

            // if user is inactive or blocked 0=inactive; 2=inactive
            if (($user->status ?? 0) === 0)
            return response()
            ->commonJSONResponse('You are inactive, please contact in support.', 401, 'error'); 

            if (($user->status ?? 0) === 2)
            return response()
            ->commonJSONResponse('You are blocked, please contact in support.', 401, 'error');

            Auth::login($user);

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

    /**
     * Logout functionality
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()
            ->commonJSONResponse('Logout successfully');
    }
}
