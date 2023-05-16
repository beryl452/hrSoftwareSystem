<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HistorySalaire>
 */
class HistorySalaireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'MontantSalaireBrut' => $this->faker->numberBetween(100000, 1000000),
            'DateEffet' => $this->faker->date,
            'DateFin' => $this->faker->date,
            'Status' => $this->faker->boolean,
        ];
    }
}
