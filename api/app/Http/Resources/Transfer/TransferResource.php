<?php

namespace App\Http\Resources\Transfer;

use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransferResource extends JsonResource
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
            'reason' => $this->reason,
            'approuve' => $this->approuve,
            'from' => $this->whenLoaded('from', fn () => $this->from->username),
            'to' => $this->whenLoaded('to', fn () => $this->to->username),
            'task' => $this->whenLoaded('task', fn () => $this->task->name),
        ];
    }
}
