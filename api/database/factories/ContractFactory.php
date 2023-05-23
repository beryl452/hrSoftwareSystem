<?php

namespace Database\Factories;

use App\Models\Person;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contract>
 */
class ContractFactory extends Factory
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
            'agent_id' => fake()->randomElement(Person::pluck('id')),
            'baseSalary' => $this->faker->numberBetween(100000, 300000),
            'start_date' => $startDate,
            'end_date' => $this->faker->dateTimeBetween($startDate, '+5 years'),
            'department_id' => $this->faker->unique()->numberBetween(1, 10),
            'function' => $this->faker->jobTitle,
            'status' => $this->faker->boolean,
        ];
    }
}
