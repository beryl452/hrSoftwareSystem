<?php

use App\Http\Controllers\RessourceController;
use App\Http\Controllers\RoleController;
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
        });

    Route::post('/logout', [UserController::class, 'logout']);
});

Route::post('/login', [UserController::class, 'login']);
