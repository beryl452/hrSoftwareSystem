<?php

namespace App\Http\Resources\User;

use App\Models\Agent;
use App\Models\Contract;
use App\Models\Person;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'role' => Role::query()
                ->where('id', $this->role_id)
                ->first(),
            'person' => Person::query()
                ->with([
                    'agent',
                ])
                ->where('id', $this->person_id)
                ->first(),
        ];
    }
}
