<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Consultation;
use App\Models\Measurement;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class MeasurementController extends Controller
{
    use HttpResponses;

    public function getSpecificMeasurement(Request $request){
        $user= Auth::user();

        $measurementID=$request['measurementID'];

        $measurement = Measurement::find($measurementID);

            if($measurement){
            return $this->success([
                'measurement'=> $measurement
            ]);
            }else{
                return $this->error('','Measurement did not found',400);
            }

     }

     public function addMeasurement(Request $request){
        $validated = $request->validate([
            'bloodGlucoseLevel'=>['required','numeric'],
            'carbIntake'=>['required','numeric'],
       ]);

           $measurement=Measurement::create([
            'bloodGlucoseLevel'=>$request->bloodGlucoseLevel,
            'carbIntake'=>$request->carbIntake,
            'user_id'=>Auth::user()->id,
           ]);

            return $this->success([
                'measurement'=>$measurement,
            ]);

     }

     public function updateMeasurement(Request $request){
        $validated = $request->validate([
            'bloodGlucoseLevel'=>['required','numeric'],
            'carbIntake'=>['required','numeric'],
            'measurementID'=> ['required','exists:measurements,id'],
            'measurementDate'=>['required','date_format:Y-m-d H:i:s']
       ]);

           $measurement=Measurement::find($request->measurementID)->update([
            'bloodGlucoseLevel'=>$request->bloodGlucoseLevel,
            'carbIntake'=>$request->carbIntake,
            'measurementDate'=>$request->measurementDate
           ]);

            return $this->success([
                'measurement'=>Measurement::find($request->measurementID),
            ]);

     }

     public function deleteMeasurement(Request $request){
        $measurementID=$request['measurementID'];

        $measurement=Measurement::destroy($measurementID);

            if($measurement){
            return $this->success([
                'measurement'=> 'deleted'
            ]);
            }else{
                return $this->error('','Measurement did not found',400);
            }

     }

     public function dateMeasurement(Request $request){
        $validated = $request->validate([
            'amka'=>['required','numeric','digits:9'],
            'startAt'=>['required','date_format:Y-m-d H:i:s'],
            'endAt'=>['required','date_format:Y-m-d H:i:s']
       ]);

           $user=User::where('amka',$request->amka)->first();

           $measurement=Measurement::where('user_id',$user->id)->whereBetween('measurementDate',[$request->startAt,$request->endAt])->get();

            return $this->success([
                'measurement'=>$measurement,
            ]);
     }




}