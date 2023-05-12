<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;

    protected $fillable = [
        'transferReason',
        'approved',
        'approvedDate',
        'transferedBy',
        'transferedTo',
        'task_id',
    ];

    public function  task()
    {
        return $this->belongsTo(Task::class);
    }

    public function  transferedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function  transferedTo()
    {
        return $this->belongsTo(User::class);
    }


}
