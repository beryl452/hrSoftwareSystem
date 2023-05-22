<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RessourceRoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // ['ressource_id','role_id'] is primary key for ressource_role table so
            // this couple should be unique
            'ressource_id' => $this->faker->numberBetween(1, 10),
            'role_id' => $this->faker->unique()->numberBetween(1, 10),
        ];
    }
}
