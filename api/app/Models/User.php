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
        'password',
        'person_id',
        'role_id'
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
        'password' => 'hashed',
    ];


    public function person():BelongsTo
    {
        return $this->belongsTo(Person::class);
    }

    public function role():BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function loginHistory():HasMany
    {
        return $this->hasMany(LoginHistory::class);
    }

    public function projects():HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function transferTo():HasMany
    {
        return $this->hasMany(Transfer::class);
    }
    public function transferFrom():HasMany
    {
        return $this->hasMany(Transfer::class);
    }
    public function assigne():HasMany
    {
        return $this->hasMany(Task::class);
    }
    public function taskCreatedBy():HasMany
    {
        return $this->hasMany(Task::class);
    }
    public function taskUpdatedBy():HasMany
    {
        return $this->hasMany(Task::class);
    }
    public function projectCreatedBy():HasMany
    {
        return $this->hasMany(Project::class);
    }
    public function projectUpdatedBy():HasMany
    {
        return $this->hasMany(Project::class);
    }

}
