<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    use HasFactory;

    protected $fillable = [
        'serialNumber'
    ];

    public function person()
    {
        return $this->belongsTo(Person::class);
    }
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }
}
