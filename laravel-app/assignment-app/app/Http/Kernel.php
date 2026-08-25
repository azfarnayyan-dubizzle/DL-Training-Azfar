<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    // ... other Kernel properties/groups stay as Laravel scaffolded them ...

    /**
     * Register the middleware alias so it can be referenced
     * as 'secret.key' in routes/api.php.
     *
     * Laravel 10 and earlier: add it to this array.
     * Laravel 11+: register it in bootstrap/app.php instead
     * (see bootstrap/app.php in this project for the equivalent line).
     */
    protected $middlewareAliases = [
        // ...Laravel's default aliases (auth, guest, etc.) remain here...
        'secret.key' => \App\Http\Middleware\CheckSecretKey::class,
    ];
}
