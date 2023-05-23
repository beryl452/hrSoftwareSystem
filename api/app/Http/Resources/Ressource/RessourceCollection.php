<?php

namespace App\Http\Resources\Ressource;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RessourceCollection extends ResourceCollection
{
    public $collects = RessourceResource::class;
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
        ];
    }
}
