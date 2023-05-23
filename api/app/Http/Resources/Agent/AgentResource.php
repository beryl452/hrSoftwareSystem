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
            'code'=> $this->code,
            'contract' => Contract::query()
                ->with([
                    'department',
                ])
                ->where('id', $this->contract_id)
                ->andWhere('status', true)
                ->first(),
        ];
    }
}
