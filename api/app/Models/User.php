<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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

    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function loginHistory()
    {
        return $this->hasMany(LoginHistory::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function transferTo()
    {
        return $this->hasMany(Transfer::class);
    }
    public function transferFrom()
    {
        return $this->hasMany(Transfer::class);
    }
    public function assigne()
    {
        return $this->hasMany(Task::class);
    }
    public function taskCreatedBy()
    {
        return $this->hasMany(Task::class);
    }
    public function taskUpdatedBy()
    {
        return $this->hasMany(Task::class);
    }
    public function projectCreatedBy()
    {
        return $this->hasMany(Project::class);
    }
    public function projectUpdatedBy()
    {
        return $this->hasMany(Project::class);
    }

}
