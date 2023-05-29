<?php
namespace App\Responses\Task;

use App\Http\Resources\Task\TaskCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class TaskCollectionResponse implements \Illuminate\Contracts\Support\Responsable
{
    public function __construct(
        private readonly LengthAwarePaginator|Collection $collection,
        private readonly int $status = 200,
    )
    {}

    public function toResponse($request)
    {
        return response(json_encode([
            'tasks' => TaskCollection::make($this->collection)->response()->getData(),
        ]), $this->status);
    }
}
