<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientDoctorAssociation extends Model
{
    use HasFactory;

    protected $fillable = [
        'isActive',
        'patient_id',
        'doctor_id'
    ];


    public function doctor($patient_ids)
    {
        return $this->belongsTo(User::class)->whereIn('patient_id', $patient_ids);
    }

    public function patient($doctor_ids)
    {
        return $this->belongsTo(User::class)->whereIn('patient_id', $doctor_ids);
    }
}
