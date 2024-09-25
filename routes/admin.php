<?php

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

Route::get('/login', function() {
    return view('Admin.app');
});

Route::get('/404', function() {
    return view('Admin.app');
});

Route::middleware('auth.page')->get('/{route_name}', function (string $route_name) {
    return view('Admin.app');
})->where('route_name', '.*');
