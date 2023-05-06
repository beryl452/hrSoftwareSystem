<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'firstname',
        'lastname',
        'Birth',
        'function',
        'role',
        'department_id',
        'email',
        'password',
        'password_confirmation'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function projectCreators(): HasMany
    {
        return $this->hasMany(Project::class, 'created_by');
    }

    public function projectUpdaters(): HasMany
    {
        return $this->hasMany(Project::class, 'updated_by');
    }

    public function taskCreators(): HasMany
    {
        return $this->hasMany(Task::class, 'created_by');
    }

    public function taskUpdaters(): HasMany
    {
        return $this->hasMany(Task::class, 'updated_by');
    }

    public function assignees(): HasMany
    {
        return $this->hasMany(Task::class, 'assigned_to');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function createdBy(): HasMany
    {
        return $this->hasMany(Project::class, 'created_by');
    }

    public function updatedBy(): HasMany
    {
        return $this->hasMany(Project::class, 'updated_by');
    }
}
