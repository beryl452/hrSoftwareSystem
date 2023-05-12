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
        return [
            'title' => $this->faker->title,
            'description' => $this->faker->text,
            'status' => $this->faker->randomElement(['to Do', 'Doing', 'Done']),
            'start_date' => $this->faker->dateTime,
            'end_date' => $this->faker->dateTime,
            'due_date' => $this->faker->dateTime,
            'created_by' => $this->faker->numberBetween(1, 10),
            'updated_by' => $this->faker->numberBetween(1, 10),
            'file' => $this->faker->url(),
            'project_id' => $this->faker->numberBetween(1, 10),
            'assigned_to' => $this->faker->numberBetween(1, 10),
            'ponderation' => $this->faker->numberBetween(1, 100),
            'acknowledgement' => $this->faker->boolean(),
            'acknowledgement_date' => $this->faker->dateTime(),
            'cancelValidation' => $this->faker->dateTime(),
            'validation' => $this->faker->dateTime(),
        ];
    }
}
