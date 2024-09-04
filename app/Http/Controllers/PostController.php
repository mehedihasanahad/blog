<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
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

            $posts = Post::with([
                'categories',
                'comments',
                'likes',
                'tags',
                'user',
                'post_views'
            ])->when(!empty($search), function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
                $q->orWhere('slug', 'like', "%{$search}%");
            })->paginate($limit ?? 10);

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse(null,
                    "Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}",
                'error', 500);
        }

        if (empty($posts)) return response()
            ->commonJSONResponse(null, 'Resource not found.', 'failed', 404);

        return response()
            ->commonJSONResponse($posts, 'Data retrieved successfully');
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
}
