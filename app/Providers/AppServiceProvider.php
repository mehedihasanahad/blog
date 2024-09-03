<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Response::macro('commonJSONResponse', function ($value, $message = 'Success', $status = 'success', $status_code = 200) {

            return response()->json([
                'title' => 'Blog site API Service',
                'status' => $status,
                'data' => $value,
                'message' => $message
            ], $status_code);
        });
    }
}
