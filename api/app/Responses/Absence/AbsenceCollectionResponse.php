<?php
namespace App\Responses\Absence;

use App\Http\Resources\AskAbsence\AskAbsenceRessource;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class AbsenceCollectionResponse implements \Illuminate\Contracts\Support\Responsable
{
    public function __construct(
        private readonly LengthAwarePaginator|Collection $collection,
        private readonly int $status = 200,
    )
    {}

    public function toResponse($request)
    {
        return response(json_encode([
            'absences' =>  AskAbsenceRessource::collection($this->collection)->response()->getData(),
        ]), $this->status);
    }
}
