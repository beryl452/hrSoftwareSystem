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
        return $this->belongsTo(User::class,'assigned_to');
    }
    public function taskCreatedBy()
    {
        return $this->belongsTo(User::class,'created_by');
    }
    public function taskUpdatedBy()
    {
        return $this->belongsTo(User::class,'updated_by');
    }
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
