<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Absence>
 */
class AbsenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-2 years', '+2 years');
        return [
            // 'start_date' between '2021-01-01' and '2023-12-31'
            'start_date' => $startDate,
            // 'end_date' between 'start_date' and '2023-12-31'
            'end_date' => $this->faker->dateTimeBetween($startDate, '+2 years'),
            'motif' => $this->faker->randomElement(['Vacances', 'Maladie', 'Maternité', 'Paternité', 'Congé sans solde']),
            'contract_id'=> $this->faker->numberBetween(1, 10),
            'validate' => $this->faker->boolean,
        ];
    }
}
