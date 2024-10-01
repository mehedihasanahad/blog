<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class CategoryController extends Controller
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

            $categories = Category::when(!empty($search), function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
                $q->orWhere('slug', 'like', "%{$search}%");
            })->orderByDesc('id')
            ->paginate($limit ?? 10);

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($categories)) return response()
            ->commonJSONResponse('Resource not found.', 404, 'failed');

        return response()
            ->commonJSONResponse('Data retrieved successfully', 200, 'success', $categories);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreCategoryRequest $request
     * @return JsonResponse
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        try {
            $validated_data = $request->validated();

            $category = new Category();
            $category->name = $validated_data['name'];
            $category->slug = $validated_data['slug'];
            $category->description = $validated_data['description'];
            $category->image = "/uploads/" . $validated_data['image']->store('admin/category');
            $category->status = $validated_data['status'];
            $category->created_by = Auth::user()->id;
            $category->updated_by = Auth::user()->id;

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($category->save())) return response()
            ->commonJSONResponse('Failed to create new category', 500, 'failed');

        return response()
            ->commonJSONResponse('Category created successfully');
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
    public function update(UpdateCategoryRequest $request, string $id)
    {
        try {
            $validated_data = $request->validated();

            $category = Category::find(Crypt::decryptString($id));
            $category->name = $validated_data['name'];
            $category->slug = $validated_data['slug'];
            $category->description = $validated_data['description'];
            if (!empty($request->image) && is_object($request->image))
                $category->image = "/uploads/" . $request->image->store('admin/category');
            $category->status = $validated_data['status'];
            $category->updated_by = Auth::user()->id;

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($category->save())) return response()
            ->commonJSONResponse('Failed to update the category', 500, 'failed');

        return response()
            ->commonJSONResponse('Category updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * get active category resources.
     * @return JsonResponse
     */
    public function getActiveList() {
        try {
            $categories = Category::where('status', 1)->orderByDesc('id')->get();
        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($categories)) return response()
            ->commonJSONResponse('Resource not found.', 404, 'failed');

        return response()
            ->commonJSONResponse('Data retrieved successfully', 200, 'success', $categories);
    }
}
