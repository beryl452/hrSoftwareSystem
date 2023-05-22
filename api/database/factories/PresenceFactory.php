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
        $arrivee = $this->faker->dateTimeBetween('-2 years', '+2 years');
        return [
            'arrivalDate' => $arrivee,
            'departureTime' => $this->faker->dateTimeBetween($arrivee, '+2 years'),
            'contract_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
