<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::middleware(['web'])->group(function() {


Route::apiResource('posts', PostController::class);

Route::get('/categories/active', [CategoryController::class, 'getActiveList']);
Route::apiResource('categories', CategoryController::class);

Route::get('/tags/active', [TagController::class, 'getActiveList']);
Route::apiResource('tags', TagController::class);

Route::post('/login', [UserController::class, 'login']);

Route::get('/get-userinfo', [UserController::class, 'getUserInfo']);

});
