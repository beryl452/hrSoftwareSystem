<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->date;
        return [
            'name' => $this->faker->unique()->text(5),
            'description' => $this->faker->unique()->text(20),
            'start_date' => $startDate,
            'end_date' => $this->faker->dateTimeBetween($startDate, '+5 years'),
            'due_date' => $this->faker->dateTimeBetween($startDate, '+5 years'),
            'status' => $this->faker->randomElement(['toDo', 'doing', 'done', 'awaitingValidation']),
            'created_by' => $this->faker->numberBetween(1, 10),
            'updated_by' => $this->faker->numberBetween(1, 10),
            'folder' => $this->faker->unique()->text(5),
        ];
    }
}
