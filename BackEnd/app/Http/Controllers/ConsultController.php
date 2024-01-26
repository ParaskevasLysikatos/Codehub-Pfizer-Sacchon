<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Consultation;
use App\Models\Measurement;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ConsultController extends Controller
{
    use HttpResponses;

    public function getConsultation(Request $request)
    {
        $user_id=$request['user_id'];
        $consultation_id=$request['consultation_id'];
        $result=Consultation::query();

        if($consultation_id){
            $result=$result->find($consultation_id);

            return $this->success([
                'consultation' => $result
            ]);
        }


        if($user_id){
            $result=$result->where('user_id',$user_id)->get();

            return $this->success([
                'consultations_patient' => $result
            ]);
        }

        return $this->error('','give query paramenters like user_id or consultation_id',400);

    }

    public function createConsultation(Request $request)
    {
        $validated = $request->validate([
            'consultationMsg' => ['required', 'string'],
            'user_id' => ['required', 'numeric', 'exists:users,id'],
        ]);

        $consultation = Consultation::create([
                'consultationMsg' => $request->consultationMsg,
                'user_id' => $request->user_id
            ]);

        return $this->success([
            'new_consulation' => $consultation
        ]);

    }

    public function updateConsultation(Request $request)
    {
        $validated = $request->validate([
            'consultationMsg' => ['string'],
            'id' => ['required', 'numeric', 'exists:consultations,id'],
            'isRead'=>['boolean']
        ]);

        $consultation = Consultation::find($request->id)->update([
                'consultationMsg' => $request->consultationMsg,
                'isRead' => $request->isRead
            ]);

        return $this->success([
            'update_consulation' => $consultation
        ]);

    }


    public function deleteConsultation(Request $request)
    {
        Consultation::find($request->id)->delete();

        return $this->success([
            'delete_consulation' => 'success',
        ]);
    }


    public function patPeriodConsultation(Request $request)
    {
        $validated = $request->validate([
            'amka' => ['required', 'numeric', 'digits:9'],
            'startAt' => ['required', 'date'],
            'endAt'=> ['required', 'date']
        ]);

        $userPat= User::where('amka', $request->amka)->first();

        $consultations=Consultation::where('user_id',$userPat->id)->whereBetween('registerDate', [$request->startAt, $request->endAt])->get();

        return $this->success([
            'pat_consulations' => $consultations,
        ]);
    }

    public function waitForDays(){

        $consultationsLastForEveryPat=Consultation::select('user_id','registerDate')->groupBy('user_id')->latest()->get();

        $consultationsWaitDays=$consultationsLastForEveryPat->map(function($con){
           // if(Carbon::parse($con->registerDate)->diff(now())->format('%a')>4){
            return[
                'patient_id'=>$con->user_id,
                'registerDate'=>$con->registerDate,
                'daysFromLastConsultation'=>  Carbon::parse($con->registerDate)->diff(now())->format('%a')
            ];
       // }
        });

        return $this->success([
            $consultationsWaitDays
        ]);
    }

}
