<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ProjectController;
use App\Models\User;
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
    Route::get('/projectsSearch/{search}',[ProjectController::class,'search']);
    Route::get('/collaborators',[UserController::class,'collaborator']);

    Route::get('/projectsDownload/{project}',[ProjectController::class,'download']);

    Route::get('/tasksDownload/{task}',[TaskController::class,'download']);

    Route::resource('/users', UserController::class)
        ->only(['index', 'show', 'update', 'destroy']);

    Route::post('/register', [UserController::class, 'register']);

    Route::post('/tasks', [TaskController::class, 'create']);

    Route::resource('/tasks', TaskController::class)
        ->only(['index', 'show','update' ,'destroy']);

    Route::post('/projects', [ProjectController::class, 'create']);

    Route::resource('/projects', ProjectController::class)
        ->only(['index', 'show', 'update', 'destroy']);

    Route::resource('/comments', CommentController::class)
        ->only(['index', 'show', 'update', 'destroy']);

    Route::resource('/departments', DepartmentController::class)
        ->only(['index', 'show', 'update', 'destroy']);

    Route::post('/logout', [UserController::class, 'logout']);

    Route::get('usersBilan', [UserController::class, 'usersBilan']);

    Route::get('projectsBilan', [ProjectController::class, 'projectsBilan']);
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [UserController::class, 'login']);
