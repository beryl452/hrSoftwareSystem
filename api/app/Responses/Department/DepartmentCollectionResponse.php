<?php
namespace App\Responses\Department;

use App\Http\Resources\Department\DepartmentResource;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class DepartmentCollectionResponse implements \Illuminate\Contracts\Support\Responsable
{
    public function __construct(
        private readonly LengthAwarePaginator|Collection $collection,
        private readonly int $status = 200,
    )
    {}

    public function toResponse($request)
    {
        return response(json_encode([
            'departments' =>  DepartmentResource::collection($this->collection)->response()->getData(),
        ]), $this->status);
    }
}
