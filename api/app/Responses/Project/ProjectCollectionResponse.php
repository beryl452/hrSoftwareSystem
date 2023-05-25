<?php
namespace App\Responses\Project;

use App\Http\Resources\Project\ProjectCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ProjectCollectionResponse implements \Illuminate\Contracts\Support\Responsable
{
    public function __construct(
        private readonly LengthAwarePaginator|Collection $collection,
        private readonly int $status = 200,
    )
    {}

    public function toResponse($request)
    {
        return response(json_encode([
            'projects' =>  ProjectCollection::make($this->collection)->response()->getData(),
        ]), $this->status);
    }
}
