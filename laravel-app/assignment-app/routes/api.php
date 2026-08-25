<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Public route - no Secret-Key required
Route::get('/tasks', [TaskController::class, 'index']);
Route::get('/tasks/{task}', [TaskController::class, 'show']);

// Protected routes - require "Secret-Key" header (see CheckSecretKey middleware)
Route::middleware('secret.key')->group(function () {
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
});
