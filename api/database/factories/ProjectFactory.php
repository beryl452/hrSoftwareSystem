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
        ];
    }
}
