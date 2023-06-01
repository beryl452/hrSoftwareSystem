<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\RessourceController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\AbsenceController;
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
    Route::prefix('people')
        ->as('people.')
        ->group(static function () {
            Route::get('/', [PersonController::class, 'index'])->name('index');
        });
    Route::prefix('department')
        ->as('department.')
        ->group(static function () {
            Route::get('/', [DepartmentController::class, 'index'])->name('index');
        });
    Route::prefix('users')
        ->as('users.')
        ->group(static function () {
            Route::get('/users', UserController::class . '@index')->name('index');
            Route::post('/create', UserController::class . '@store')->name('store');
            Route::put('/update/{user}', [UserController::class, 'update'])->name('update');
            Route::get('/users/{user}/', UserController::class . '@index')->name('filterUsers');
            Route::get('/board', [UserController::class, 'board'])->name('board');
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
            Route::get('/download/{project}', [ProjectController::class, 'download'])->name('downloadProject');
        });

    Route::prefix('task')
        ->as('task.')
        ->group(static function () {
            Route::post('/create', TaskController::class . '@store')->name('store');
            // Validate task create by another person than Task manager
            Route::put('/validate/{task}', [TaskController::class, 'validation'])->name('validation');
            Route::put('/receipt/{task}', [TaskController::class, 'receipt'])->name('receipt');
            Route::get('/tasks/{project}/', [TaskController::class, 'index'])->name('index');
            Route::get('/tasks/{project}/{search}', [TaskController::class, 'index'])->name('searchTasks');
            //Validate task submit by collaborator
            Route::put('/validated/{task}', [TaskController::class, 'validated'])->name('validated');
            Route::put('/submit/{task}', [TaskController::class, 'submit'])->name('submit');
        });

    Route::prefix('agent')
        ->as('agent.')
        ->group(static function () {
            Route::get('/agent', [AgentController::class, 'index'])->name('index');
            Route::get('/allAgents', [AgentController::class, 'allAgents'])->name('allAgents');
            Route::get('/allAgents/{search}', [AgentController::class, 'allAgents'])->name('filterAgents');
            Route::post('/create', AgentController::class . '@store')->name('store');
            Route::put('/update/{agent}', [AgentController::class, 'update'])->name('update');
            Route::delete('/delete/{agent}', [AgentController::class, 'destroy'])->name('delete');
        });

    Route::prefix('contract')
        ->as('contract.')
        ->group(static function () {
            // Route::get('/contract', [ContractControler::class, 'index'])->name('index');
            Route::get('/allContracts', [ContractController::class, 'allContracts'])->name('allContracts');
            Route::get('/contract/{agent}/', [ContractController::class, 'index'])->name('index');
            Route::get('/allContracts/{search}', [ContractController::class, 'allContracts'])->name('filterContracts');
            Route::post('/create', ContractController::class . '@store')->name('store');
            Route::put('/update/{contract}', [ContractController::class, 'update'])->name('update');
            Route::delete('/delete/{contract}', [ContractController::class, 'destroy'])->name('delete');
        });

        Route::prefix('absence')
        ->as('absence.')
        ->group(static function () {
            Route::post('/create', AbsenceController::class . '@store')->name('store');
        });



    Route::prefix('person')
        ->as('person.')
        ->group(static function () {
            Route::get('/person', [PersonController::class, 'index'])->name('index');
            Route::get('/allPersons', [PersonController::class, 'allPersons'])->name('allPersons');
            Route::get('/allPersons/{search}', [PersonController::class, 'allPersons'])->name('filterPersons');
            Route::post('/create', PersonController::class . '@store')->name('store');
            Route::put('/update/{person}', [PersonController::class, 'update'])->name('update');
            Route::delete('/delete/{person}', [PersonController::class, 'destroy'])->name('delete');
        });
    Route::prefix('role')
        ->as('role.')
        ->group(static function () {
            Route::get('/role', [RoleController::class, 'index'])->name('index');
            Route::get('/allRoles', [RoleController::class, 'allRoles'])->name('allRoles');
            Route::get('/allRoles/{search}', [RoleController::class, 'allRoles'])->name('filterRoles');
            Route::post('/create', RoleController::class . '@store')->name('store');
            Route::put('/update/{role}', [RoleController::class, 'update'])->name('update');
            Route::delete('/delete/{role}', [RoleController::class, 'destroy'])->name('delete');
        });

    Route::prefix('transfer')
        ->as('transfer.')
        ->group(static function () {
            Route::get('/transfer', [TransferController::class, 'index'])->name('index');
            Route::get('/allTransfers/{search}', [TransferController::class, 'allTransfers'])->name('filterTransfers');
            Route::post('/create', TransferController::class . '@store')->name('store');
            Route::put('/approuve/{transfer}', [TransferController::class, 'approuve'])->name('approuve');
            Route::delete('/delete/{transfer}', [TransferController::class, 'destroy'])->name('delete');
        });

    Route::post('/logout', [UserController::class, 'logout']);
});

Route::post('/login', [UserController::class, 'login']);
