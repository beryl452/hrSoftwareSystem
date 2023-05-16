<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public $fillable = [
        'title',
        'description',
        'status',
        'start_date',
        'end_date',
        'due_date',
        'created_by',
        'updated_by',
        'assigned_to',
        'file',
        'project_id',
        'penalty',
        'retard'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function taskCreator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function taskUpdater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
