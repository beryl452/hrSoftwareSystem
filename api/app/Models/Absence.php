<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;
    protected $fillable = [
        'start_date',
        'end_date',
        'motif',
        'contract_id',
        'validate'
    ];


    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }
}
