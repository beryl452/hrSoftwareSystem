<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transfer>
 */
class TransferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reason' => $this->faker->text(20),
            'approuve' => $this->faker->boolean,
            'user_from'=> $this->faker->numberBetween(1, 10),
            'user_to'=> $this->faker->numberBetween(1, 10),
            'task_id'=> $this->faker->numberBetween(1, 10),
        ];
    }
}
