<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Person extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'birthdate',
        'email',
        'phone',
    ];

    public function agent(): HasOne
    {
        return $this->hasOne(Agent::class);
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

}
