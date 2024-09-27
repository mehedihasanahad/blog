<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardReport extends Controller
{
    /**
     * get card related reports
     */
    public function getCardReport() {
        try {
            $reports = DB::table(DB::raw('DUAL')) // Using `DUAL` table to mimic a single-row table query
            ->select([
                DB::raw('FORMAT((SELECT COUNT(*) FROM users), 0) AS total_users'),
                DB::raw('FORMAT((SELECT COUNT(*) FROM users WHERE DATE(created_at) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)), 0) AS new_users'),
                DB::raw('FORMAT((SELECT COUNT(*) FROM posts), 0) AS total_posts'),
                DB::raw('FORMAT((SELECT COUNT(*) FROM posts WHERE is_published = 1), 0) AS total_published_posts'),
                DB::raw('FORMAT((SELECT COUNT(*) FROM roles), 0) AS total_roles'),
                DB::raw('FORMAT((SELECT COUNT(*) FROM categories), 0) AS total_categories'),
                DB::raw('FORMAT((SELECT COUNT(*) FROM tags), 0) AS total_tags')
            ])
            ->first();

        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        return response()
            ->commonJSONResponse('Report data fetched successfully', 200, 'success', $reports);
    }

    /**
     * get chart related reports
     */
    public function getChartReport() {
        try {
            $category_wise_posts = DB::table('posts')->select('cat.name', DB::raw("COUNT('posts.id') AS post"))
                                    ->leftJoin('post_categories AS p', 'p.post_id', '=', 'posts.id')
                                    ->leftJoin('categories AS cat', 'cat.id', '=', 'p.category_id')
                                    ->groupBy('cat.name')
                                    ->orderByDESC('post')
                                    ->limit(5)
                                    ->get();

            $month_wise_posts = DB::table('posts')
                                    ->select(DB::raw("CONCAT_WS(', ', MONTHNAME(created_at), YEAR(created_at)) AS month_year"), DB::raw("COUNT(id) AS post"))
                                    ->groupByRaw('month_year')
                                    ->orderByDESC('created_at')
                                    ->limit(12)
                                    ->get();

            $month_wise_users = DB::table('users')
                                    ->select(DB::raw("CONCAT_WS(', ', MONTHNAME(created_at), YEAR(created_at)) AS month_year"), DB::raw("COUNT(id) AS user"))
                                    ->groupByRaw('month_year')
                                    ->orderByDESC('user')
                                    ->limit(10)
                                    ->get();
        } catch (\Exception $e) {
            return response()
                ->commonJSONResponse("Message: {$e->getMessage()}, Line: {$e->getLine()}, File: {$e->getFile()}", 500, 'error');
        }

        return response()
            ->commonJSONResponse('Report data fetched successfully', 200, 'success', [
                'category_wise_posts' => $category_wise_posts,
                'month_wise_posts' => $month_wise_posts,
                'month_wise_users' => $month_wise_users
            ]);
    }
}
