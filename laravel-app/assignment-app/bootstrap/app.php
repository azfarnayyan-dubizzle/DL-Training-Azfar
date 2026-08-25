<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Laravel 11+ way of registering the same 'secret.key' alias
        // used in routes/api.php. If you're on Laravel 10 or earlier,
        // use app/Http/Kernel.php instead and delete this file.
        $middleware->alias([
            'secret.key' => \App\Http\Middleware\CheckSecretKey::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
