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
        $startDate = $this->faker->dateTimeBetween('-1 year', 'now');
        return [
            'name' => $this->faker->regexify('[a-z]{10}'),
            'description' => $this->faker->text(20),
            'start_date' => $startDate,
            'end_date' => $this->faker->dateTimeBetween($startDate, '+1 years'),
            'due_date' => $this->faker->dateTimeBetween($startDate, '+1 years'),
            'status' => $this->faker->randomElement(['toDo', 'doing', 'done', 'awaitingValidation']),
            'project_id' => $this->faker->numberBetween(1, 10),
            'created_by' => $this->faker->numberBetween(1, 10),
            'updated_by' => $this->faker->numberBetween(1, 10),
            'receipt' => $this->faker->boolean,
            'folder' => $this->faker->regexify('/[a-z]{10}/'),
            'cancelValidation' =>  $this->faker->dateTimeBetween($startDate, '+1 years'),
            // 'assigned_to' user where role is collaborator
            'assigned_to' => $this->faker->numberBetween(1, 10),



        ];
    }
}
