<?php
namespace App\Responses\Person;

use App\Http\Resources\Person\PersonCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class PersonCollectionResponse implements \Illuminate\Contracts\Support\Responsable
{
    public function __construct(
        private readonly LengthAwarePaginator|Collection $collection,
        private readonly int $status = 200,
    )
    {}

    public function toResponse($request)
    {
        return response(json_encode([
            'people' =>  PersonCollection::make($this->collection)->response()->getData(),
        ]), $this->status);
    }
}
