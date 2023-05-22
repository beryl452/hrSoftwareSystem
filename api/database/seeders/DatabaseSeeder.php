<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Database\Factories\RessourceRoleFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Department::factory(10)->create();
        \App\Models\Role::factory(
            [
                'name' => 'collaborator',
            ]
        )
            ->hasAttached(
                \App\Models\Ressource::factory(3),
            )
            ->count(3)
            ->create();
        \App\Models\Role::factory(
            [
                'name' => 'Task manager',
            ]
        )
            ->hasAttached(
                \App\Models\Ressource::factory(3),
            )
            ->count(3)
            ->create();
        \App\Models\Role::factory(
            [
                'name' => 'Payroll manager',
            ]
        )
            ->hasAttached(
                \App\Models\Ressource::factory(3),
            )
            ->count(3)
            ->create();
        \App\Models\Role::factory(
            [
                'name' => 'Administrator',
            ]
        )
            ->hasAttached(
                \App\Models\Ressource::factory(3),
            )
            ->count(3)
            ->create();
        \App\Models\Person::factory(10)->create();
        \App\Models\Agent::factory(10)->create();
        \App\Models\User::factory(10)->create();
        \App\Models\Contract::factory(10)->create();
        \App\Models\Presence::factory(10)->create();
        \App\Models\Absence::factory(10)->create();
        \App\Models\Project::factory(10)->create();
        \App\Models\Task::factory(10)->create();
        \App\Models\Transfer::factory(10)->create();
        \App\Models\Supplement::factory(10)->create();
        \App\Models\Salary::factory(10)->create();
    }
}
