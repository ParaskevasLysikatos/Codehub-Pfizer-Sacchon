<?php

namespace App\Http\Controllers;

use App\Enums\AccountTypeEnum;
use App\Enums\GenderEnum;
use App\Http\Resources\UserResource;
use App\Models\Consultation;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    use HttpResponses;

    public function getAllUsers(){
       $users = User::all();
       return $this->success([
        'users'=> UserResource::collection($users)
         ]);
    }

    public function unreadConsult(){
        // $validated = $request->validate([
        //     'email' => 'required|email|exists:users',
        //     'password' => 'required',
        // ]);

       // $user=User::where('email',$request['email'])->first();

        // if (!Hash::check($request['password'], $user->password)) {
        //     return $this->error('','Crendentials do not match',401);
        // }

        $user = Auth::user();

        $consultations= Consultation::where('user_id',$user->id)->where('isRead',false)->count();

        return $this->success([
            'role'=> $user->accountType,
            'unreadConsultations'=>  $consultations
        ]);

     }


     public function getProfile(){
        $user = Auth::user();
        return $this->success([
         'user'=> new UserResource($user)
          ]);
     }

     public function updateProfile(Request $request){

        $validated = $request->validate([
            'accountType'=>Rule::in([AccountTypeEnum::ADMIN,AccountTypeEnum::DOC_PENDING,AccountTypeEnum::PATIENT]),
            'gender'=>Rule::in([GenderEnum::MALE,GenderEnum::FEMALE,GenderEnum::NEUTRAL]),
            'first_name'=>['required','string','max:255'],
            'last_name'=>['required','string','max:255'],

            'email'=>['required','string','email','max:255','unique:users'],
            'password'=>['required', Password::defaults()],

            'amka'=>['required','numeric','unique:users','digits:9'],
            'address'=>['required','string','max:255'],

            'mobile_phone'=>['required','numeric','digits_between:10,15'],

            'gender'=>['required'],
            'accountType'=>['required']
        ]);

            $user=User::find(Auth::user()->id)->update([
                'first_name'=> $request->first_name,
                'last_name'=> $request->last_name,

               'email'=> $request->email,
               'password'=>Hash::make($request->password),

                'accountType'=>$request->accountType,
                'amka'=>$request->amka,

                'mobile_phone'=>$request->mobile_phone,
                'home_phone'=>$request->home_phone,
                'address'=>$request->address,

                'gender'=>$request->gender
            ]);

        return $this->success([
            'user'=>$user,
        ]);

    }


}
