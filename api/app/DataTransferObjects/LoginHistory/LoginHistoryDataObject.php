<?php

namespace App\DataTransferObjects\LoginHistory;

use DateTime;

class LoginHistoryDataObject
{
    public function __construct(
        private readonly DateTime $date,
        private readonly int $user_id,
    )
    {}

    public function toArray(): array
    {
        return [
            'date' => $this->date,
            'user_id' => $this->user_id,
        ];
    }
}
