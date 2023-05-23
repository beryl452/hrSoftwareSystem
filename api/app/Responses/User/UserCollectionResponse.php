<?php
namespace App\Responses\User;

use App\Http\Resources\User\UserCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class UserCollectionResponse implements \Illuminate\Contracts\Support\Responsable
{
    public function __construct(
        private readonly LengthAwarePaginator|Collection $collection,
        private readonly int $status = 200,
    )
    {}

    public function toResponse($request)
    {
        return response(json_encode([
            'users' =>  UserCollection::make($this->collection)->response()->getData(),
        ]), $this->status);
    }
}
