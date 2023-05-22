<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    public function presences()
    {
        return $this->hasMany(Presence::class);
    }

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }

    public function salaries()
    {
        return $this->hasMany(Contract::class);
    }
    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }
}
