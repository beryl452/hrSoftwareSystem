<?php

namespace App\Http\Resources\AskAbsence;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AskAbsenceCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
        ];
    }
}
