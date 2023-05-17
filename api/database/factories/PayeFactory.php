<?php

namespace Database\Factories;

use App\Models\Mois;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paye>
 */
class PayeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'salaire' => $this->faker->numberBetween(100000, 1000000),
            'user_id' => $this->faker->unique()->numberBetween(1, 10),
            'mois_id' => $this->faker->unique()->numberBetween(1, 10),
            'prime_id' => $this->faker->numberBetween(1, 10),
            'configuration_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
