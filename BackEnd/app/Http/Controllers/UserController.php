<?php

namespace App\Http\Controllers;

use App\Enums\AccountTypeEnum;
use App\Enums\GenderEnum;
use App\Http\Resources\UserResource;
use App\Models\Consultation;
use App\Models\PatientDoctorAssociation;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    use HttpResponses;

    public function getAllUsers()
    {
        $users = User::all();
        return $this->success([
            'users' => UserResource::collection($users)
        ]);
    }

    public function unreadConsult()
    {

        $user = Auth::user();

        $consultations = Consultation::where('user_id', $user->id)->where('isRead', false)->count();

        return $this->success([
            'role' => $user->accountType,
            'unreadConsultations' =>  $consultations
        ]);
    }


    public function getProfile(Request $request)
    {
        if($request->id){ // was sent with id, specific
            $user=User::find($request->id)->get();
            return $this->success([
                'user' => new UserResource($user)
            ]);
        }
        // without default
        $user = Auth::user();
        return $this->success([
            'user' => new UserResource($user)
        ]);
    }

    public function updateProfile(Request $request)
    {

        $validated = $request->validate([
            'accountType' => Rule::in([AccountTypeEnum::ADMIN, AccountTypeEnum::DOC_PENDING, AccountTypeEnum::PATIENT]),
            'gender' => Rule::in([GenderEnum::MALE, GenderEnum::FEMALE, GenderEnum::NEUTRAL]),
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],

            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.Auth::user()->id],
            // 'password'=>['required', Password::defaults()],

            'amka' => ['required', 'numeric', 'unique:users,amka,'.Auth::user()->id, 'digits:9'],
            'address' => ['required', 'string', 'max:255'],

            'mobile_phone' => ['required', 'numeric', 'digits_between:10,15'],

            'gender' => ['required'],
            'accountType' => ['required']
        ]);

        if ($request->password) {
            $request->validate([
                'password' => ['required', Password::defaults()]
            ]);
        }

        $user = User::find(Auth::user()->id)->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,

            'email' => $request->email,
            // 'password'=>Hash::make($request->password),

            'accountType' => $request->accountType,
            'amka' => $request->amka,

            'mobile_phone' => $request->mobile_phone,
            'home_phone' => $request->home_phone,
            'address' => $request->address,

            'gender' => $request->gender
        ]);

        if ($request->password) {
            $user = User::find(Auth::user()->id)->update([
                'password' => Hash::make($request->password)
            ]);
        }

        return $this->success([
            'user' => $user,
        ]);
    }


    public function deleteProfile()
    {
        $user = Auth::user();
        User::find($user->id)->measurements()->delete();
        User::find($user->id)->consultations()->delete();
        User::find($user->id)->delete();

        return $this->success([
            'user' => $user,
        ]);
    }

    public function getAllPatients()
    {
        $users = User::where('accountType', AccountTypeEnum::PATIENT)->get();
        return $this->success([
            'patients' => UserResource::collection($users)
        ]);
    }

    public function getAllDoctors()
    {
        $users = User::where('accountType', AccountTypeEnum::DOCTOR)->get();
        return $this->success([
            'doctors' => UserResource::collection($users)
        ]);
    }

    public function findProfile(Request $request)
    {
        $validated = $request->validate([
            'amka' => ['required', 'numeric', 'digits:9'],
        ]);

        $user = User::where('amka', $request->amka);

        if ($request->accountType) {
            $request->validate([
                'accountType' => Rule::in([AccountTypeEnum::ADMIN, AccountTypeEnum::DOC_PENDING, AccountTypeEnum::PATIENT, AccountTypeEnum::DOCTOR])
            ]);

            $user = $user->where('accountType', $request->accountType);
        }

        return $this->success([
            'user' => $user->first() ? new UserResource($user->first()) : null
        ]);
    }


    public function getAllassociations(Request $request)
    {

        $categoryType = $request['categoryType'];
        $result = [];
        $assocP = PatientDoctorAssociation::where('isActive', true)->pluck('patient_id')->toArray();
        $assocD = PatientDoctorAssociation::where('isActive', true)->pluck('doctor_id')->toArray();
        $getAllpatients = User::where('accountType', AccountTypeEnum::PATIENT)->get();
        $getAllDoctors = User::where('accountType', AccountTypeEnum::DOCTOR)->get();

        if ($categoryType == '2') { // without doc, free patients

            foreach ($getAllpatients as $pat) {
                if (!in_array($pat['id'], $assocP)) {
                    $resultP[] = $pat;
                }
            }

            foreach ($getAllDoctors as $doc) {
                if (!in_array($doc['id'], $assocD)) {
                    $resultD[] = $doc;
                }
            }

            return $this->success([
                'free_patients' => $resultP,
                'free_doctors' => $resultD
            ]);
        }
        else if ($categoryType == '1') { // with exact doctor that calls it
            $doctor_id=Auth::user()->id;
            $active_assocs=PatientDoctorAssociation::where('isActive',true)->where('doctor_id',$doctor_id)->pluck('patient_id');
            $patients=User::whereIn('id',$active_assocs)->get();

            return $this->success([
                'doctor_with_patients' => $patients,
            ]);

        }
        else { // with doc , categoryType==null
            foreach ($getAllpatients as $pat) {
                if (in_array($pat['id'], $assocP)) {
                    $resultP[] = $pat;
                }
            }

            foreach ($getAllDoctors as $doc) {
                if (in_array($doc['id'], $assocD)) {
                    $resultD[] = $doc;
                }
            }

            return $this->success([
                'patient_with' => $resultP,
                'doctors_with' => $resultD
            ]);
        }
    }

    public function UpdateAssociations(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => ['required', 'numeric', 'exists:users,id'],
            'doctor_id' => ['required', 'numeric', 'exists:users,id'],
            'isActive' => ['required', 'boolean'],
        ]);

        $assoc = PatientDoctorAssociation::where('doctor_id', $request->doctor_id)
            ->where('patient_id', $request->patient_id)->first()
            ->update([
                'isActive' => $request->isActive,
            ]);

        return $this->success([
            'association' => $assoc
        ]);
    }

    public function CreateAssociations(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => ['required', 'numeric', 'exists:users,id'],
            'doctor_id' => ['required', 'numeric', 'exists:users,id'],
        ]);

        $assoc = PatientDoctorAssociation::create([
                'doctor_id' => $request->doctor_id,
                'patient_id' => $request->patient_id
            ]);

        return $this->success([
            'new_association' => $assoc
        ]);
    }

    public function expired(Request $request)
    {
        $needDoc = $request['needDoctors'];

        $result = User::query();

        if ($needDoc) {
            $result = $result->where('accountType', AccountTypeEnum::DOCTOR)
                ->whereDate('last_login', '<', Carbon::now()->subDays(15))
                ->get();

            return $this->success([
                'exprired' => $result
            ]);
        } else {
            $result = $result->where('accountType', AccountTypeEnum::PATIENT)
                ->whereDate('last_login', '<', Carbon::now()->subDays(15))
                ->get();

            return $this->success([
                'exprired' => $result
            ]);
        }
    }

    public function pendingDoctors(){

        $pending=User::where('accountType', AccountTypeEnum::DOC_PENDING)->get();

        return $this->success([
            'pending_docs' =>  UserResource::collection($pending)
        ]);
    }

    public function pendingDocActivate(Request $request){
        $validated = $request->validate([
            'user_id' => ['required', 'numeric', 'exists:users,id'],
        ]);

        $user=User::find($request->user_id);

        if($user->accountType==AccountTypeEnum::DOC_PENDING){
            $user->update([
                'accountType' =>AccountTypeEnum::DOCTOR,
            ]);

            return $this->success([
                'pending' =>  'pending doctor was successfully activated'
            ]);

        }

        return $this->error('', 'provide please a pending doctor', 400);
    }



}
