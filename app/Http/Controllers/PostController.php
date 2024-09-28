<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\PostTag;
use App\Models\Tag;
use Carbon\Carbon;
use Error;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

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
            })->orderByDesc('id')
            ->paginate($limit ?? 10);

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($posts)) return response()
            ->commonJSONResponse('Resource not found.', 404, 'failed');

        return response()
            ->commonJSONResponse('Data retrieved successfully', 200, 'success', $posts);
    }

    /**
     * Store a newly created resource in storage.
     * @param StorePostRequest $request
     * @return JsonResponse
     */
    public function store(StorePostRequest $request): JsonResponse
    {
        try {
            $validated_data = $request->validated();
            $categories = json_decode($validated_data['categories'], true);
            $tags = json_decode($validated_data['tags'], true);

            DB::beginTransaction();

            // Create Post
            $post = new Post();
            $post->user_id = Auth::user()->id;
            $post->title = $validated_data['title'];
            $post->subtitle = $validated_data['subtitle'];
            $post->slug = $validated_data['slug'];
            $post->content = $validated_data['content'];
            $post->featured_image = "/uploads/" . $validated_data['featured_image']->store('admin/post');
            $post->read_hour = $validated_data['read_hour'] ?? 0;
            $post->read_minute = $validated_data['read_minute'] ?? 0;
            $post->read_second = $validated_data['read_second'] ?? 0;
            $post->is_featured = $validated_data['is_featured'];
            $post->is_published = $validated_data['is_published'];
            $post->published_at = Carbon::now();
            $post->save();

            // Categories added through pivote table
            if (!is_array($categories) || empty($categories)) 
                throw new \Exception("Categories must be array and can't be empty");

            foreach($categories as $cat_key => $category) {
                $category_data = Category::find(Crypt::decryptString($category['id']));
                if (!$category_data)
                    throw new \Exception('Invalid Category data found');

                $post_category = new PostCategory();
                $post_category->post_id = $post->id;
                $post_category->category_id = Crypt::decryptString($category['id']);
                
                if (empty($post_category->save()))
                    throw new \Exception('Failed to create new post_category pivote record');
            }

            // Tags added through pivote table
            if (!is_array($tags) || empty($tags))
                throw new \Exception("Tags must be array and can't be empty");

            foreach($tags as $tag_key => $tag) {
                $tag_data = Tag::find(Crypt::decryptString($tag['id']));
                if (!$tag_data)
                    throw new \Exception('Invalid Tag data found');

                $post_tag = new PostTag();
                $post_tag->post_id = $post->id;
                $post_tag->tag_id = Crypt::decryptString($tag['id']);
                
                if (empty($post_tag->save()))
                    throw new \Exception('Failed to create new post_tag pivote record');
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($post->save())) return response()
            ->commonJSONResponse('Failed to create new post', 500, 'failed');

        DB::commit();
        return response()
            ->commonJSONResponse('Post created successfully');
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
     * @param UpdatePostRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(UpdatePostRequest $request, string $id): JsonResponse
    {
        try {
            $validated_data = $request->validated();
            $id = Crypt::decryptString($id);

            $categories = json_decode($validated_data['categories'], true);
            $category_ids = array_map(fn ($category) => Crypt::decryptString($category['id']), $categories);

            $tags = json_decode($validated_data['tags'], true);
            $tag_ids = array_map(fn ($tag) => Crypt::decryptString($tag['id']), $tags);

            DB::beginTransaction();

            // Update Post
            $post = Post::find($id);
            $post->user_id = Auth::user()->id;
            $post->title = $validated_data['title'];
            $post->subtitle = $validated_data['subtitle'];
            $post->slug = $validated_data['slug'];
            $post->content = $validated_data['content'];
            if (!empty($request->featured_image) && is_object($request->featured_image))
                $post->featured_image = "/uploads/" . $request->featured_image->store('admin/post');
            $post->read_hour = $validated_data['read_hour'] ?? 0;
            $post->read_minute = $validated_data['read_minute'] ?? 0;
            $post->read_second = $validated_data['read_second'] ?? 0;
            $post->is_featured = $validated_data['is_featured'];
            $post->is_published = $validated_data['is_published'];
            $post->published_at = Carbon::now();
            $post->save();

            // Categories added through pivote table
            if (!is_array($categories) || empty($categories))
                throw new \Exception("Categories must be array and can't be empty");
            
            // delete previous category
            PostCategory::where('post_id', $id)->delete();

            foreach($categories as $cat_key => $category) {
                $category_data = Category::find(Crypt::decryptString($category['id']));
                if (!$category_data)
                    throw new \Exception('Invalid Category data found');

                $post_category = new PostCategory();
                $post_category->post_id = $post->id;
                $post_category->category_id = Crypt::decryptString($category['id']);
                
                if (empty($post_category->save()))
                    throw new \Exception('Failed to update post_category pivote record');
            }

            // Tags added through pivote table
            
            if (!is_array($tags) || empty($tags))
                throw new \Exception("Tags must be array and can't be empty");

            // delete previous tag
            PostTag::where('post_id', $id)->delete();    
            foreach($tags as $tag_key => $tag) {
                $tag_data = Tag::find(Crypt::decryptString($tag['id']));
                if (!$tag_data)
                    throw new \Exception('Invalid Tag data found');

                $post_tag = new PostTag();
                $post_tag->post_id = $post->id;
                $post_tag->tag_id = Crypt::decryptString($tag['id']);
                
                if (empty($post_tag->save()))
                    throw new \Exception('Failed to update post_tag pivote record');
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($post->save())) return response()
            ->commonJSONResponse('Failed to update the post', 500, 'failed');

        DB::commit();
        return response()
            ->commonJSONResponse('Post updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
