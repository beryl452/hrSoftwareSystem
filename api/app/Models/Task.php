<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'start_date',
        'due_date',
        'status',
        'created_by',
        'updated_by',
        'project_id',
        'assigned_to'
    ];

    public function tranfers()
    {
        return $this->hasMany(Transfer::class);
    }
    public function assignedTo()
    {
        return $this->belongsTo('assigned_to', User::class);
    }
    public function projectCreatedBy()
    {
        return $this->hasMany('created_by', User::class);
    }
    public function projectUpdatedBy()
    {
        return $this->hasMany('updated_by', User::class);
    }
}
