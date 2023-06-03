<?php

namespace App\Http\Resources\AskAbsence;

use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AskAbsenceRessource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'motif' => $this->motif,
            'validate' => $this->validate,
            'contract' => Contract::query()
            ->with([
                'department',
                'agent' => function ($query) {
                    $query->with([
                        'person',
                    ]);
                },
            ])
            ->where('status', true)
            ->first(),
        ];
    }
}
