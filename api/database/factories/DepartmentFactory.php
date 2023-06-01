<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Department>
 */
class DepartmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => $this->faker->unique()->randomNumber(4),
            'libelle' => $this->faker->unique()->text(20),
            'PercentPerMinuteOfDelayPresence'=> $this->faker->randomFloat(5, 0, 0.0005),
            'PercentPerDayOfDelayTask'=> $this->faker->randomFloat(5, 0, 0.0005),
        ];
    }
}
