<?php
namespace App\Responses\Agent;

use App\Http\Resources\Agent\AgentCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class AgentCollectionResponse implements \Illuminate\Contracts\Support\Responsable
{
    public function __construct(
        private readonly LengthAwarePaginator|Collection $collection,
        private readonly int $status = 200,
    )
    {}

    public function toResponse($request)
    {
        return response(json_encode([
            'agents' =>  AgentCollection::make($this->collection)->response()->getData(),
        ]), $this->status);
    }
}
