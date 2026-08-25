<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSecretKey
{
    /**
     * Allow the request through only if a "Secret-Key" header is present
     * and matches the value configured in .env (SECRET_KEY).
     */
    public function handle(Request $request, Closure $next): Response
    {
        $providedKey = $request->header('Secret-Key');
        $expectedKey = env('SECRET_KEY', 'my-secret-key');

        if (! $providedKey || $providedKey !== $expectedKey) {
            return response()->json([
                'message' => 'Unauthorized. Missing or invalid Secret-Key header.',
            ], 401);
        }

        return $next($request);
    }
}
