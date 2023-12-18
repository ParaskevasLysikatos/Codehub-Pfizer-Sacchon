<?php

namespace App\Http\Controllers;

use App\Enums\AccountTypeEnum;
use App\Enums\GenderEnum;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Enum;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request){

      $request->validated($request->all());

      if(!Auth::attempt($request->only(['email','password']))){
        return $this->error('','Crendentials do not match',401);
      }

      $user=User::where('email',$request->email)->first();

      return $this->success([
       'user'=> $user,
       'token'=>$user->createToken('api token of '.$user->name)->plainTextToken
        ]);

    }

    public function register(StoreUserRequest $request){
        $request->validated($request->all());

        // $validated = $request->validate([
        //      'gender'=>['required',[new Enum(GenderEnum::class)]],
        //     'accountType'=>['required',[new Enum(AccountTypeEnum::class)]],
        // ]);

            $user=User::create([
                'first_name'=> $request->first_name,
                'last_name'=> $request->last_name,

                'email'=> $request->email,
                'password'=>Hash::make($request->password),

                'accountType'=>$request->email,
                'amka'=>$request->anka,

                'mobile_phone'=>$request->mobile_phone,
                'address'=>$request->address,

                'gender'=>$request->gender
            ]);

        return $this->success([
            'user'=>$user,
            'token'=>$user->createToken('api token of '.$user->name)->plainTextToken
        ]);

    }


    public function logout(Request $request){
      Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message'=>" Logout success and token deleted"
        ]);
    }


}
