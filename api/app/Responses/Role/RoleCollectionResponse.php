<?php
namespace App\Responses\Role;

use App\Http\Resources\Role\RoleCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class RoleCollectionResponse implements \Illuminate\Contracts\Support\Responsable
{
    public function __construct(
        private readonly LengthAwarePaginator|Collection $collection,
        private readonly int $status = 200,
    )
    {}

    public function toResponse($request)
    {
        return response(json_encode([
            'roles' => RoleCollection::make($this->collection)->response()->getData(),
        ]),$this->status);
    }
}
