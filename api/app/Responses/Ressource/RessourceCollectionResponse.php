<?php
namespace App\Responses\Ressource;

use App\Http\Resources\Ressource\RessourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class RessourceCollectionResponse implements \Illuminate\Contracts\Support\Responsable
{
    public function __construct(
        private readonly LengthAwarePaginator|Collection $collection,
        private readonly int $status = 200,
    )
    {}

    public function toResponse($request)
    {
        return response(json_encode([
            'ressources' =>  RessourceCollection::make($this->collection)->response()->getData(),
        ]), $this->status);
    }
}
