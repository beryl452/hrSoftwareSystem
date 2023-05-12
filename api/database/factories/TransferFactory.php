<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transfer>
 */
class TransferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'transferReason' => $this->faker->text(50),
            'approved' => $this->faker->boolean,
            'approvedDate' => $this->faker->dateTime,
            'transferedBy' => $this->faker->numberBetween(1, 10),
            'transferedTo' => $this->faker->numberBetween(1, 10),
            'task_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
