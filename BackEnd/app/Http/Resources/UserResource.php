<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = null;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'first_name' => $this->first_name,
            'last_name'=> $this->last_name,
            'accountType'=> $this->accountType,
            'address' => $this->address,
            'active' => $this->active,
            'amka' => $this->amka,
            'mobile_phone' => $this->mobile_phone,
            'home_phone' => $this->home_phone,
            'gender' => $this->gender,
            'last_login' => $this->last_login,
            'email' => $this->email
        ];
    }
}
