<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class HistorySalaire extends Model
{
    use HasFactory;

    public function payes () :HasMany
    {
        return $this->hasMany(Paye::class);
    }
}