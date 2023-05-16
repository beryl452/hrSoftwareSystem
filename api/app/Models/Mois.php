<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mois extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class,'Paye','mois_id','user_id')->withPivot('salaire','historySalaire_id','prime_id','configuration_id')->withTimestamps();
    }
}
