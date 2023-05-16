<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Paye extends Model
{
    use HasFactory;
    public function historySalaire()
    {
        return $this->belongsTo(HistorySalaire::class);
    }
    public function prime(): HasMany
    {
        return $this->hasMany(Prime::class);
    }


}
