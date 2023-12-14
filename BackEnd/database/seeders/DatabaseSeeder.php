<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\AccountTypeEnum;
use App\Enums\GenderEnum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // doctor
        \App\Models\User::create([
            'first_name'=>'dr1',
            'last_name'=>'theDr1',
            'accountType'=>AccountTypeEnum::DOCTOR,
            'active'=>true,
            'amka'=>'123456789',
            'address'=>'street 123',
            'mobile_phone'=>'22227777777777',
            'home_phone'=>'222233334444',
            'gender'=>GenderEnum::MALE,
            'email'=>'dr1@hotmail.com',
            'password'=>Hash::make('123456')
        ]);

        \App\Models\User::create([
            'first_name'=>'dr2',
            'last_name'=>'theDr2',
            'accountType'=>AccountTypeEnum::DOCTOR,
            'active'=>true,
            'amka'=>'123456788',
            'address'=>'street 123',
            'mobile_phone'=>'22227777777777',
            'home_phone'=>'222233334444',
            'gender'=>GenderEnum::MALE,
            'email'=>'dr2@hotmail.com',
            'password'=>Hash::make('123456')
        ]);

         // patient
         \App\Models\User::create([
            'first_name'=>'pt2',
            'last_name'=>'thePt2',
            'accountType'=>AccountTypeEnum::PATIENT,
            'active'=>true,
            'amka'=>'123456787',
            'address'=>'street 123',
            'mobile_phone'=>'22227777777777',
            'home_phone'=>'222233334444',
            'gender'=>GenderEnum::MALE,
            'email'=>'pt2@hotmail.com',
            'password'=>Hash::make('123456')
        ]);

        \App\Models\User::create([
            'first_name'=>'pt1',
            'last_name'=>'thePt1',
            'accountType'=>AccountTypeEnum::PATIENT,
            'active'=>true,
            'amka'=>'123456786',
            'address'=>'street 123',
            'mobile_phone'=>'22227777777777',
            'home_phone'=>'222233334444',
            'gender'=>GenderEnum::MALE,
            'email'=>'pt1@hotmail.com',
            'password'=>Hash::make('123456')
        ]);

        //admin
        \App\Models\User::create([
            'first_name'=>'ad1',
            'last_name'=>'theAd1',
            'accountType'=>AccountTypeEnum::ADMIN,
            'active'=>true,
            'amka'=>'123456785',
            'address'=>'street 123',
            'mobile_phone'=>'22227777777777',
            'home_phone'=>'222233334444',
            'gender'=>GenderEnum::MALE,
            'email'=>'ad1@hotmail.com',
            'password'=>Hash::make('123456')
        ]);

    }
}
