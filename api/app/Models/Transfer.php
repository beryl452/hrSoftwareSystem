<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;

    public function from()
    {
        return $this->belongsTo('user_from',User::class);
    }
    public function to()
    {
        return $this->belongsTo('user_to',User::class);
    }
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
