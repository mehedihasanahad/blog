<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Post;
use App\Models\SeriesContent;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class WebController extends Controller
{
    public function index() {
        $categories = Category::where('status', 1)->get();
        $latestblogs = Post::with(['categories', 'tags'])->select('posts.*', DB::raw("DATE(published_at) AS published_date"))->where(['is_published' => 1])->orderByDesc('id')->take(3)->get();
        $featuredBlogs = Post::where(['is_published' => 1, 'is_featured' => 1])->orderByDesc('id')->take(4)->get();

        return view('Frontend.pages.hero', compact('categories', 'latestblogs', 'featuredBlogs'));
    }

    public function individualCategory($slug) {
        $paginateFirst = config('app.app_settings.paginateFirst');
        $categoryDetails = Category::where([
            'slug' => $slug,
            'status' => 1
        ])->first();

        $blogs = Post::leftJoin('post_categories AS pc', 'pc.post_id', '=', 'posts.id')
                 ->where('pc.category_id', $categoryDetails->id)
                 ->paginate($paginateFirst);

        $totalBlog = Post::where('is_published', 1)->count();

        if ($categoryDetails) return view('Frontend.pages.tag', compact('categoryDetails', 'blogs', 'totalBlog'));
        else abort(404);
    }

    public function individualBlog(Request $request, $slug) {
        $blog = Post::where(['slug' => $slug, 'is_published' => 1])->first();
        $featuredBlogs = Post::where(['is_published' => 1, 'is_featured' => 1])->orderByDesc('id')->take(4)->get();
        $latestblogs = Post::where(['is_published' => 1,])->orderByDesc('id')->take(3)->get();
        if ($blog) return view('Frontend.pages.details', compact('blog', 'featuredBlogs', 'latestblogs'));
        abort(404);
    }

    public function getBlogs() {
        $blogs = Post::with(['categories', 'tags'])
        ->select('posts.*', DB::raw("DATE(published_at) AS published_date"))
        ->where(['is_published' => 1])
        ->paginate(6);

        return response()->json([
            'blogs' => $blogs,
            'status' => 200,
            'message' => 'success'
        ]);
    }

    public function individualTagDataBlogs($id) {
        $decryptId = Crypt::decryptString($id);
        $blogs = Blog::where([['status', 1], ['tag_ids', 'like', "%$decryptId%"]])
            ->select(['id', 'title', 'sub_title','tag_ids', 'small_img', 'hour', 'minute', 'second', 'content_type', DB::raw("Date(created_at) AS created_date")])
            ->paginate(3);
        $blogs->makeHidden(['boolstatus', 'boolfeatured', 'boolcontenttype', 'booltemplate']);

        return response()->json([
            'blogs' => $blogs,
            'status' => 200,
            'message' => 'success'
        ]);
    }
}
