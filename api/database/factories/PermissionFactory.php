<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Permission>
 */
class PermissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'Debut' => $this->faker->date,
            'Fin' => $this->faker->date,
            'Motif' => $this->faker->text,
            'Valide' => $this->faker->boolean,
            'PermissionType' => $this->faker->randomElement(['Absence','Conges']),
            'user_id' => $this->faker->numberBetween(1, 10),

        ];
    }
}
