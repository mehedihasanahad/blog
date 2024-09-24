<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Permission;
use App\Models\Role;
use App\Models\RoleHasPermission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
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

            $roles = Role::with(['permissions'])
                ->when(!empty($search), function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
                $q->orWhere('guard_name', 'like', "%{$search}%");
            })->orderByDesc('id')
            ->paginate($limit ?? 10);

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($roles)) return response()
            ->commonJSONResponse('Resource not found.', 404, 'failed');

        return response()
            ->commonJSONResponse('Data retrieved successfully', 200, 'success', $roles);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreRoleRequest $request
     * @return JsonResponse
     */
    public function store(StoreRoleRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $validated_data = $request->validated();
            $permissions = json_decode($validated_data['permissions'], true);

            $role = new Role();
            $role->name = $validated_data['name'];
            $role->guard_name = $validated_data['guard_name'];
            $role->save();

            // Permissions added through pivote table
            if (!is_array($permissions) || empty($permissions)) 
                throw new \Exception("Permissions must be array and can't be empty");

            foreach($permissions as $permission_key => $permission) {
                $permission_data = Permission::find(Crypt::decryptString($permission['id_enc']));
                if (!$permission_data)
                    throw new \Exception('Invalid permission data found');

                $rol_has_permission = new RoleHasPermission();
                $rol_has_permission->permission_id = Crypt::decryptString($permission['id_enc']);
                $rol_has_permission->role_id = $role->id;
                
                if (empty($rol_has_permission->save()))
                    throw new \Exception('Failed to create new rol_has_permission pivote record');
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($role->id ?? null)) return response()
            ->commonJSONResponse('Failed to create new Role', 500, 'failed');

        DB::commit();

        return response()
            ->commonJSONResponse('Role created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * @param UpdateRoleRequest $request
     * @return JsonResponse
     */
    public function update(UpdateRoleRequest $request, string $id)
    {
        try {
            DB::beginTransaction();

            $validated_data = $request->validated();
            $permissions = json_decode($validated_data['permissions'], true);
            $role_id = Crypt::decryptString($id);

            $role = Role::find($role_id);
            $role->name = $validated_data['name'];
            $role->guard_name = $validated_data['guard_name'];
            $role->save();

            // Permissions added through pivote table
            if (!is_array($permissions) || empty($permissions))
                throw new \Exception("Permissions must be array and can't be empty");

            // delete previous permissions
            RoleHasPermission::where('role_id', $role_id)->delete();

            foreach($permissions as $permission_key => $permission) {
                $permission_data = Permission::find(Crypt::decryptString($permission['id_enc']));
                if (!$permission_data)
                    throw new \Exception('Invalid permission data found');

                $rol_has_permission = new RoleHasPermission();
                $rol_has_permission->permission_id = Crypt::decryptString($permission['id_enc']);
                $rol_has_permission->role_id = $role->id;
                
                if (empty($rol_has_permission->save()))
                    throw new \Exception('Failed to create new rol_has_permission pivote record');
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($role->id ?? null)) return response()
            ->commonJSONResponse('Failed to update Role', 500, 'failed');

        DB::commit();

        return response()
            ->commonJSONResponse('Role updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();

            $role_id = Crypt::decryptString($id);

            // delete previous permissions
            RoleHasPermission::where('role_id', $role_id)->delete();

            $role = Role::find($role_id);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($role->delete())) return response()
            ->commonJSONResponse('Failed to delete the role', 500, 'failed');
        DB::commit();

        return response()
            ->commonJSONResponse('Role deleted successfully');
    }

    /**
     * get active category resources.
     * @return JsonResponse
     */
    public function getActiveList(): JsonResponse {
        try {
            $roles = Role::orderByDesc('id')->get();
        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($roles)) return response()
            ->commonJSONResponse('Resource not found.', 404, 'failed');

        return response()
            ->commonJSONResponse('Data retrieved successfully', 200, 'success', $roles);
    }
}
