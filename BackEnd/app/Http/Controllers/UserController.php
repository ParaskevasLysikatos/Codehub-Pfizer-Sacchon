<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\Consultation;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use HttpResponses;

    public function getAllUsers(Request $request){
       $users = User::all();
       return $this->success([
        'users'=> UserResource::collection($users)
         ]);
    }

    public function unreadConsult(Request $request){
        $validated = $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required',
        ]);

        $user=User::where('email',$request['email'])->first();

        if (!Hash::check($request['password'], $user->password)) {
            return $this->error('','Crendentials do not match',401);
        }

        $consultations= Consultation::where('user_id',$user->id)->where('isRead',false)->count();

        return $this->success([
            'role'=> $user->accountType,
            'unreadConsultations'=>  $consultations
        ]);

     }


}
