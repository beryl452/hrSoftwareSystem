<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;
    protected $fillable = [
        'baseSalary',
        'agent_id',
        'start_date',
        'end_date',
        'department_id',
        'function',
        'status',
    ];

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
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
