<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RessourceController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Resources\Agent\AgentCollection;
use App\Http\Resources\Person\PersonCollection;
use App\Http\Resources\Ressource\RessourceCollection;
use App\Models\Agent;
use App\Models\User;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(static function () {
    Route::get('/user', static function (Request $request) {

        return [
            new PersonCollection(
                Person::query()
                    ->with([
                        'agent',
                    ])
                    ->where('id', $request->user()->person_id)
                    ->get()
            ),
            new AgentCollection(
                Agent::query()
                    ->with([
                        'contracts',
                    ])
                    ->where('person_id', $request->user()->person_id)
                    ->get(),
            )
        ];
    });

    Route::prefix('users')
        ->as('users.')
        ->group(static function () {
            Route::get('/users', UserController::class . '@index')->name('index');
            Route::get('/collaborators', [UserController::class, 'collaborators'])->name('collaborators');
        });

    Route::prefix('role')
        ->as('role.')
        ->group(static function () {
            Route::get('/', RoleController::class . '@index')->name('index');
            Route::get('/{role}/', RoleController::class . '@show')->name('show');
        });

    Route::prefix('abilities')
        ->as('abilities.')
        ->group(static function () {
            Route::delete('/{role}/{ressource}', [RoleController::class, 'deleteAbility'])->name('deleteAbility');
            Route::post('/addAbility', [RoleController::class, 'addAbility'])->name('addAbility');
            Route::get('createAbilities', [RessourceController::class, 'createAbilities'])->name('createAbilities');
            Route::get('/', RessourceController::class . '@index')->name('index');
        });

    Route::prefix('project')
        ->as('project.')
        ->group(static function () {
            Route::get('/', [RessourceController::class, 'index'])->name('index');
            // /allProjects can take parameters for filtering or not
            Route::get('/allProjects', [ProjectController::class, 'index'])->name('allProjects');
            Route::get('/allProjects/{project}', [ProjectController::class, 'index'])->name('filterProjects');
            Route::post('/create', ProjectController::class . '@store')->name('store');
            Route::put('/changeStatus/{project}', [ProjectController::class, 'changeStatus'])->name('changeStatus');
            Route::put('/validation/{project}', [ProjectController::class, 'validation'])->name('validation');
            Route::put('/closeProject/{project}', [ProjectController::class, 'closeProject'])->name('closeProject');
            Route::delete('/delete/{project}', [ProjectController::class, 'destroy'])->name('deleteProject');
        });

    Route::prefix('task')
        ->as('task.')
        ->group(static function () {
            Route::post('/create', TaskController::class . '@store')->name('store');
            Route::put('/receipt/{task}', [TaskController::class, 'receipt'])->name('receipt');
        });

    Route::post('/logout', [UserController::class, 'logout']);
});

Route::post('/login', [UserController::class, 'login']);
