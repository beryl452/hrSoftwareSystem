<?php
namespace App\Responses\Transfer;

use App\Http\Resources\Transfer\TransferCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class TransferCollectionResponse implements \Illuminate\Contracts\Support\Responsable
{
    public function __construct(
        private readonly LengthAwarePaginator|Collection $collection,
        private readonly int $status = 200,
    )
    {}

    public function toResponse($request)
    {
        return response(json_encode([
            'transfers' =>  TransferCollection::make($this->collection)->response()->getData(),
        ]), $this->status);
    }
}
