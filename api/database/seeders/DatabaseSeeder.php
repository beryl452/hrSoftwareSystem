<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Department::factory(10)->create();
        \App\Models\User::factory(10)->create([
            'department_id' => \App\Models\Department::inRandomOrder()->first()->id,
        ]);
        \App\Models\Project::factory(10)->create([
            'created_by' => \App\Models\User::inRandomOrder()->first()->id,
            'updated_by' => \App\Models\User::inRandomOrder()->first()->id,
        ]);
        \App\Models\Task::factory(10)->create([
            'created_by' => \App\Models\User::inRandomOrder()->first()->id,
            'updated_by' => \App\Models\User::inRandomOrder()->first()->id,
            'project_id' => \App\Models\Project::inRandomOrder()->first()->id,
            'assigned_to' => \App\Models\User::where('role', 'Collaborator')->inRandomOrder()->first()->id,
        ]);
        \App\Models\Comment::factory(10)->create([
            'user_id' => \App\Models\User::inRandomOrder()->first()->id,
            'task_id' => \App\Models\Task::inRandomOrder()->first()->id,
        ]);
    }
}
