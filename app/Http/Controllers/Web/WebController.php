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

    public function individualTag($id) {
        $paginateFirst = config('app.app_settings.paginateFirst');
        $decryptId = Crypt::decryptString($id);
        $tagDetails = Tag::where([
            'id' => $decryptId,
            'status' => 1
        ])->first();

        $blogs = Blog::where([['status', 1], ['tag_ids', 'like', "%$decryptId%"]])
            ->select(['id', 'title', 'sub_title','tag_ids', 'small_img'])
            ->paginate($paginateFirst);

        $totalBlog = Blog::where([['status', 1], ['tag_ids', 'like', "%$decryptId%"]])->count();

        if ($tagDetails) return view('pages.tag', compact('tagDetails', 'blogs', 'totalBlog'));
        else abort(404);
    }

    public function individualBlog(Request $request, $id) {
        $content_type = $request->content_type;
        $decryptId = Crypt::decryptString($id);
        $blog = Blog::where(['id' => $decryptId, 'status' => 1])->first();
        switch ($content_type) {
            case 1:
                $featuredBlogs = Blog::where(['status' => 1, 'is_featured' => 1])->orderByDesc('id')->take(4)->get(['id', 'title', 'small_img']);
                $latestblogs = Blog::where(['status' => 1,])->orderByDesc('id')->take(3)->get();
                if ($blog) return view('pages.details', compact('blog', 'featuredBlogs', 'latestblogs'));
                else abort(404);
                break;
            case 2:
                $series_content_list = SeriesContent::where('blog_id', $decryptId)->pluck('title', 'id');
                if ($blog) return view('pages.details', compact('blog', 'series_content_list'));
                break;
            default:
                abort(404);
        }
    }

    public function individualSeriesContent($blog_id, $id) {
        $decryptBlogId = Crypt::decryptString($blog_id);
        $decryptId = Crypt::decryptString($id);

        $blog = Blog::where(['id' => $decryptBlogId, 'status' => 1])->first();
        $series_content_list = SeriesContent::where('blog_id', $decryptBlogId)->pluck('title', 'id');

        if (empty($blog)) abort(404);
        $content = SeriesContent::where('id', $decryptId)->first();

        return view('pages.details', compact('blog', 'content', 'series_content_list'));
    }

    public function getBlogs() {
        $blogs = Post::with(['categories', 'tags'])
        ->select('posts.*', DB::raw("DATE(published_at) AS published_date"))
        ->where(['is_published' => 1])
        ->paginate(3);

        return response()->json([
            'blogs' => $blogs,
            'status' => 200,
            'message' => 'success'
        ]);
    }

    public function encrptJsVariable($id) {
        return response()->json([
            'encryptedId' => Crypt::encryptString($id),
            'status' => 200,
            'message' => 'success'
        ]);
    }

    public function getTags() {
        $tags = Tag::where('status', 1)->get();

        return response()->json([
            'tags' => $tags,
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

    public function seriesContent($id) {
        $decryptId = Crypt::decryptString($id);

        $seriesContent = SeriesContent::leftJoin('blogs', 'series_contents.blog_id', '=', 'blogs.id')
            ->where([
                'series_contents.blog_id' => $decryptId,
                'series_contents.status' => 1
            ])
            ->get([
                'series_contents.*',
                'blogs.title as blog_title'
            ]);

        return response()->json([
            'seriesContent' => $seriesContent,
            'status' => 200,
            'message' => 'success'
        ]);
    }
}
