<?php

use App\Http\Controllers\Auth\FacebookController;
use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardReport;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Web\WebController;

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

    Route::get('/categories/active', [CategoryController::class, 'getActiveList']);
    Route::get('/tags/active', [TagController::class, 'getActiveList']);
    Route::get('/permissions/active', [PermissionController::class, 'getActiveList']);
    Route::get('/roles/active', [RoleController::class, 'getActiveList']);


    Route::apiResource('posts', PostController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('tags', TagController::class);
    Route::apiResource('users', UserController::class);
    Route::apiResource('permissions', PermissionController::class);
    Route::apiResource('roles', RoleController::class);


    Route::post('/login', [UserController::class, 'login']);
    Route::get('/logout', [UserController::class, 'logout']);
    Route::get('/get-userinfo', [UserController::class, 'getUserInfo']);
    Route::put('/update-profile/{id}', [UserController::class, 'updateProfile']);


    // google login
    Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

    // facebook login
    Route::get('auth/facebook', [FacebookController::class, 'redirectToFacebook'])->name('auth.facebook');
    Route::get('auth/facebook/callback', [FacebookController::class, 'handleFacebookCallback']);

    
    // dashboard report
    Route::get('card-reports', [DashboardReport::class, 'getCardReport']);
    Route::get('chart-reports', [DashboardReport::class, 'getChartReport']);
});


Route::get('/get-blogs', [WebController::class, 'getBlogs']);
