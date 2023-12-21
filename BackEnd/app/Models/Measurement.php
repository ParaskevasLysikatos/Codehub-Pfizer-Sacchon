<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    use HasFactory;


    protected $fillable = [
        'bloodGlucoseLevel',
        'carbIntake',
        'user_id',
        'measurementDate'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
