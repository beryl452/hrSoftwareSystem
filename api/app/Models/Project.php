<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'due_date',
        'status',
        'folder',
        'created_by',
        'updated_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function projectCreatedBy()
    {
        return $this->belongsTo('created_by', Project::class);
    }
    public function projectUpdatedBy()
    {
        return $this->belongsTo('updated_by', Project::class);
    }
}
