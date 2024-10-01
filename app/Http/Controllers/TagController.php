<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class TagController extends Controller
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

            $tags = Tag::when(!empty($search), function($q) use ($search) {
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
     * @param StoreTagRequest $request
     * @return JsonResponse
     */
    public function store(StoreTagRequest $request): JsonResponse
    {
        try {
            $validated_data = $request->validated();

            $tag = new Tag();
            $tag->name = $validated_data['name'];
            $tag->slug = $validated_data['slug'];
            $tag->image = "/uploads/" . $validated_data['image']->store('admin/tag');
            $tag->status = $validated_data['status'];
            $tag->created_by = Auth::user()->id;
            $tag->updated_by = Auth::user()->id;

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($tag->save())) return response()
            ->commonJSONResponse('Failed to create new tag', 500, 'failed');

        return response()
            ->commonJSONResponse('Tag created successfully');
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
    public function update(UpdateTagRequest $request, string $id)
    {
        try {
            $validated_data = $request->validated();

            $tag = Tag::find(Crypt::decryptString($id));
            $tag->name = $validated_data['name'];
            $tag->slug = $validated_data['slug'];
            if (!empty($request->image) && is_object($request->image))
                $tag->image = "/uploads/" . $request->image->store('admin/tag');
            $tag->status = $validated_data['status'];
            $tag->updated_by = Auth::user()->id;

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($tag->save())) return response()
            ->commonJSONResponse('Failed to update the tag', 500, 'failed');

        return response()
            ->commonJSONResponse('Tag updated successfully');
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
            $tags = Tag::where('status', 1)->orderByDesc('id')->get();
        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($tags)) return response()
            ->commonJSONResponse('Resource not found.', 404, 'failed');

        return response()
            ->commonJSONResponse('Data retrieved successfully', 200, 'success', $tags);
    }
}
