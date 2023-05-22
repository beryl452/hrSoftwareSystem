<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function projectCreatedBy()
    {
        return $this->belongsTo('created_by',Project::class);
    }
    public function projectUpdatedBy()
    {
        return $this->belongsTo('updated_by',Project::class);
    }
}
