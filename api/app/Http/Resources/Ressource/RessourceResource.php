<?php

namespace App\Http\Resources\Ressource;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RessourceResource extends JsonResource
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
            'name' => $this->name,
            'method' => $this->method,
            'uri' => $this->uri,
        ];
    }
}
