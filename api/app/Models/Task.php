<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public function tranfers()
     {
        return $this->hasMany(Transfer::class);
     }
     public function assignedTo()
     {
        return $this->belongsTo('assigned_to',User::class);
     }
     public function projectCreatedBy()
     {
         return $this->hasMany('created_by',User::class);
     }
     public function projectUpdatedBy()
     {
         return $this->hasMany('updated_by',User::class);
     }
}
