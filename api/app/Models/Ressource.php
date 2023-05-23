<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ressource extends Model
{
    use HasFactory;

    //for $fillable
    protected $fillable = [
        'name',
        'method',
        'uri',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'ressource_role');
    }
}
