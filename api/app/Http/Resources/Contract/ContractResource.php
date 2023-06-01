<?php

namespace App\Http\Resources\Contract;

use App\Http\Resources\Department\DepartmentResource;
use App\Http\Resources\Agent\AgentResource;
use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContractResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'function' => $this->function,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'baseSalary' => $this->baseSalary,
            'status' => $this->status,
            'department' => $this->whenLoaded('department'),
            'agent' =>   Agent::query()
                            ->with([
                                'person',
                                'contracts',
                                ])
                            ->where('id', $this->whenLoaded('agent')->id)
                            ->get()
                                    ,
        ];
    }
}
