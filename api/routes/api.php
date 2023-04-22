<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DepartmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::resource('/users', UserController::class)
        ->only(['index', 'show', 'update', 'destroy']);

    Route::post('/register', [UserController::class, 'register']);

    Route::resource('/tasks', TaskController::class)
        ->only(['index', 'show', 'update', 'destroy']);

    Route::resource('/comments', CommentController::class)
        ->only(['index', 'show', 'update', 'destroy']);

    Route::resource('/departments', DepartmentController::class)
        ->only(['index', 'show', 'update', 'destroy']);

    Route::post('/logout', [UserController::class, 'logout']);
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [UserController::class, 'login']);
