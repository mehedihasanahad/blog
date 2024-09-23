<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use App\Models\Permission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class PermissionController extends Controller
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

            $permissions = Permission::when(!empty($search), function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
                $q->orWhere('guard_name', 'like', "%{$search}%");
            })->orderByDesc('id')
            ->paginate($limit ?? 10);

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($permissions)) return response()
            ->commonJSONResponse('Resource not found.', 404, 'failed');

        return response()
            ->commonJSONResponse('Data retrieved successfully', 200, 'success', $permissions);
    }

    /**
     * Store a newly created resource in storage.
     * @param StorePermissionRequest $request
     * @return JsonResponse
     */
    public function store(StorePermissionRequest $request): JsonResponse
    {
        try {
            $validated_data = $request->validated();

            $permission = new Permission();
            $permission->name = $validated_data['name'];
            $permission->guard_name = $validated_data['guard_name'];

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($permission->save())) return response()
            ->commonJSONResponse('Failed to create new permission', 500, 'failed');

        return response()
            ->commonJSONResponse('Permission created successfully');
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
     * @param UpdatePermissionRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(UpdatePermissionRequest $request, string $id): JsonResponse
    {
        try {
            $validated_data = $request->validated();

            $permission = Permission::find(Crypt::decryptString($id));
            $permission->name = $validated_data['name'];
            $permission->guard_name = $validated_data['guard_name'];

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($permission->save())) return response()
            ->commonJSONResponse('Failed to update the permission', 500, 'failed');

        return response()
            ->commonJSONResponse('Permission updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $permission = Permission::find(Crypt::decryptString($id));

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($permission->delete())) return response()
            ->commonJSONResponse('Failed to delete the permission', 500, 'failed');

        return response()
            ->commonJSONResponse('Permission deleted successfully');
    }

    /**
     * get active category resources.
     * @return JsonResponse
     */
    public function getActiveList(): JsonResponse {
        try {
            $permissions = Permission::orderByDesc('id')->get();
        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($permissions)) return response()
            ->commonJSONResponse('Resource not found.', 404, 'failed');

        return response()
            ->commonJSONResponse('Data retrieved successfully', 200, 'success', $permissions);
    }
}
