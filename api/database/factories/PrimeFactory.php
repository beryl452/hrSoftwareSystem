<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prime>
 */
class PrimeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'MontantPrime' => $this->faker->numberBetween(1000, 10000),
            'MotifPrime'=> $this->faker->text,

        ];
    }
}
