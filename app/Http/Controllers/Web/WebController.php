<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Post;
use App\Models\SeriesContent;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class WebController extends Controller
{
    public function index() {
        try {
            $categories = Category::where('status', 1)->get();
            $latestblogs = Post::with(['categories', 'tags'])->select('posts.*', DB::raw("DATE(published_at) AS published_date"))->where(['is_published' => 1])->orderByDesc('id')->take(3)->get();
            $featuredBlogs = Post::where(['is_published' => 1, 'is_featured' => 1])->orderByDesc('id')->take(4)->get();
    
            return view('Frontend.pages.hero', compact('categories', 'latestblogs', 'featuredBlogs'));
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * get blogs list
     * @return JsonResponse
     */
    public function getBlogs(): JsonResponse {
        try {
            $blogs = Post::with(['categories', 'tags'])
            ->select('posts.*', DB::raw("DATE(published_at) AS published_date"))
            ->where(['is_published' => 1])
            ->paginate(6);

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($blogs)) return response()
        ->commonJSONResponse('Failed to fetch blog data', 500, 'failed');

        return response()
            ->commonJSONResponse('Fetched blogs data successfully', 200, 'success', $blogs);
    }

    public function individualBlog(Request $request, $slug) {
        $blog = Post::where(['slug' => $slug, 'is_published' => 1])->first();
        $featuredBlogs = Post::where(['is_published' => 1, 'is_featured' => 1])->orderByDesc('id')->take(4)->get();
        $latestblogs = Post::where(['is_published' => 1,])->orderByDesc('id')->take(3)->get();
        if ($blog) return view('Frontend.pages.details', compact('blog', 'featuredBlogs', 'latestblogs'));
        abort(404);
    }

    public function individualCategory($slug) {
        $paginateFirst = config('app.app_settings.paginateFirst');
        $categoryDetails = Category::where([
            'slug' => $slug,
            'status' => 1
        ])->first();

        $totalBlog = Category::find($categoryDetails->id)->posts()->where('is_published', 1)->count();

        if ($categoryDetails) return view('Frontend.pages.tag', compact('categoryDetails', 'totalBlog'));
        else abort(404);
    }

    /**
     * get blogs of individual categories
     * @param string $id
     * @return JsonResponse
     */
    public function individualCategoryWiseBlogs(string $id): JsonResponse {
        try {
            $paginateFirst = config('app.app_settings.paginateFirst');

            $blogs = Category::find(Crypt::decryptString($id))
            ->posts()
            ->where('is_published', 1)
            ->with(['categories', 'tags'])
            ->paginate($paginateFirst);

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        if (empty($blogs)) return response()
        ->commonJSONResponse('Failed to fetch blog data', 500, 'failed');

        return response()
            ->commonJSONResponse('Fetched blogs data successfully', 200, 'success', $blogs);
    }
}
