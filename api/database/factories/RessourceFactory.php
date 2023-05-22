<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ressource>
 */
class RessourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->regexify('[a-z]{10}'),
            'method' => $this->faker->randomElement(['GET', 'POST', 'PUT', 'DELETE']),
            'uri' => $this->faker->regexify('/[a-z]{10}/'),
        ];
    }
}
