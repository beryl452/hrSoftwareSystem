<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Mois>
 */
class MoisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'mois' => $this->faker->monthName,
            'annee' => $this->faker->unique()->year,
            'PenaltyTaskPercent' => 0.2,

        ];
    }
}
