<?php

use App\Http\Controllers\Web\WebController;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Client routes
Route::get('/', [WebController::class, 'index']);
Route::get('/category/{slug}', 'Web\WebController@individualTag');
Route::get('/blog/{slug}', 'Web\WebController@individualBlog')->name('blog');
Route::get('/series_content/{blog_id}/{id}', 'Web\WebController@individualSeriesContent')->name('seriesContent');

Route::get('/dashboard', function () {
    return view('Admin.app');
});
