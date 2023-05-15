<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['to Do', 'Doing', 'Done']);
        $due_date = $this->faker->dateTime;
        $end_date = $this->faker->dateTime;
        // Do difference between $due_date and $end_date, get answer in minute and store it in $retard variable
        $retard = $status === 'Done' ? ($due_date->diff($end_date))->format("%I") :null;

        return [
            'title' => $this->faker->title,
            'description' => $this->faker->text,
            'due_date' => $status === 'Done' ? $due_date : null,
            'status' => $status,
            'start_date' => $this->faker->dateTime,
            'end_date' => $end_date,
            'created_by' => $this->faker->numberBetween(1, 10),
            'updated_by' => $this->faker->numberBetween(1, 10),
            'file' => $this->faker->url(),
            'project_id' => $this->faker->numberBetween(1, 10),
            'assigned_to' => \App\Models\User::where('role', 'Collaborator')->inRandomOrder()->first()->id,
            'retard' => $retard,
            'penalty' => $retard * 0.01,
        ];
    }
}
