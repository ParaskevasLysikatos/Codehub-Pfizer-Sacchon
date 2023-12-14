<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;


class UserController extends Controller
{
    use HttpResponses;

    public function getAllUsers(Request $request){
       $users = User::all();
       return $this->success([
        'users'=> UserResource::collection($users)
         ]);
    }


}
