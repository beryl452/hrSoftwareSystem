<?php

namespace App\Actions\LoginHistory;

use App\Models\LoginHistory;

class StoreLoginHistoryAction
{
    public function handle(
        $date,
        $user_id
    ){
        LoginHistory::create([
            'date' => $date,
            'user_id' => $user_id,
        ]);
    }
}
