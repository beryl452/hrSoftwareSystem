<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Salary>
 */
class SalaryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'period' is a concat between the year and the month ('January 2022' for example)
            'period' => $this->faker->monthName . ' ' . $this->faker->year,
            'taxes' => $this->faker->numberBetween(10000, 30000),
            'saving' => $this->faker->numberBetween(10000, 30000),
            'contract_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
