<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name'=>['required','string','max:255'],
            'last_name'=>['required','string','max:255'],

            'email'=>['required','string','email','max:255','unique:users'],
            'password'=>['required','confirmed', Password::defaults()],

            'amka'=>['required','numeric','max:9','unique:users'],
            'address'=>['required','string','max:255'],

            'mobile_phone'=>['required','numeric','max:25']
        ];
    }
}
