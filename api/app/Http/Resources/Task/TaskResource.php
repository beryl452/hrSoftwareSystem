<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
            'description' => $this->description,
            'start_date' => $this->start_date,
            'due_date' => $this->due_date,
            'end_date' => $this->end_date,
            'end_date' => $this->end_date,
            'status' => $this->status,
            'folder' => $this->folder,
            'validated' => $this->validated,
            'receipt' => $this->receipt,
            'cancelValidation' => $this->cancelValidation,
            'weighting' => $this->weighting,
            'assigned_to'=> $this->whenLoaded('assignedTo'),
            'created_by'=> $this->whenLoaded('taskCreatedBy'),
            'updated_by'=> $this->whenLoaded('taskUpdatedBy'),
            'project_id'=> $this->whenLoaded('project')
        ];
    }
}
