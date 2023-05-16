<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Presence>
 */
class PresenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'HeureArrive' => $this->faker->dateTime(),
            'HeureDepart' => $this->faker->dateTime(),
            'user_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
