<?php

namespace App\Http\Resources\Agent;

use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AgentResource extends JsonResource
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
            'code'=> $this->code,
            'person' => $this->whenLoaded('person'),
            'contract' => Contract::query()
                ->with([
                    'department',
                ])
                ->where('status', true)
                ->first(),
        ];
    }
}
