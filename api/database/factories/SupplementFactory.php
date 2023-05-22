<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplement>
 */
class SupplementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amount = $this->faker->randomFloat(2, -1000, 1000);
        return [
            'name' => $this->faker->regexify('[a-z]{10}'),
            // 'amount' is positive or negative
            'amount' => $amount,
            'supplementType' => $amount > 0 ? 'prime' : 'penalty',
            'contract_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
