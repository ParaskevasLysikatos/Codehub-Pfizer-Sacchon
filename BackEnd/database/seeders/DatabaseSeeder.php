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
            'first_name' => 'dr1',
            'last_name' => 'theDr1',
            'accountType' => AccountTypeEnum::DOCTOR,
            'active' => true,
            'amka' => '123456789',
            'address' => 'street 123',
            'mobile_phone' => '22227777777777',
            'home_phone' => '222233334444',
            'gender' => GenderEnum::MALE,
            'email' => 'dr1@hotmail.com',
            'password' => Hash::make('123456')
        ]);

        \App\Models\User::create([
            'first_name' => 'dr2',
            'last_name' => 'theDr2',
            'accountType' => AccountTypeEnum::DOCTOR,
            'active' => true,
            'amka' => '123456788',
            'address' => 'street 123',
            'mobile_phone' => '22227777777777',
            'home_phone' => '222233334444',
            'gender' => GenderEnum::MALE,
            'email' => 'dr2@hotmail.com',
            'password' => Hash::make('123456')
        ]);

        \App\Models\User::create([
            'first_name' => 'dr3',
            'last_name' => 'theDr3',
            'accountType' => AccountTypeEnum::DOCTOR,
            'active' => true,
            'amka' => '123456888',
            'address' => 'street free',
            'mobile_phone' => '22227777777777',
            'home_phone' => '222233334444',
            'gender' => GenderEnum::MALE,
            'email' => 'dr3@hotmail.com',
            'password' => Hash::make('123456')
        ]);



        // patient
        \App\Models\User::create([
            'first_name' => 'pt2',
            'last_name' => 'thePt2',
            'accountType' => AccountTypeEnum::PATIENT,
            'active' => true,
            'amka' => '123456787',
            'address' => 'street 123',
            'mobile_phone' => '22227777777777',
            'home_phone' => '222233334444',
            'gender' => GenderEnum::MALE,
            'email' => 'pt2@hotmail.com',
            'password' => Hash::make('123456')
        ]);

        \App\Models\User::create([
            'first_name' => 'pt1',
            'last_name' => 'thePt1',
            'accountType' => AccountTypeEnum::PATIENT,
            'active' => true,
            'amka' => '123456786',
            'address' => 'street 123',
            'mobile_phone' => '22227777777777',
            'home_phone' => '222233334444',
            'gender' => GenderEnum::MALE,
            'email' => 'pt1@hotmail.com',
            'password' => Hash::make('123456')
        ]);

        \App\Models\User::create([
            'first_name' => 'pt3',
            'last_name' => 'thePt3',
            'accountType' => AccountTypeEnum::PATIENT,
            'active' => true,
            'amka' => '123456766',
            'address' => 'street free',
            'mobile_phone' => '22227777777777',
            'home_phone' => '222233334444',
            'gender' => GenderEnum::MALE,
            'email' => 'pt3@hotmail.com',
            'password' => Hash::make('123456')
        ]);

        //admin
        \App\Models\User::create([
            'first_name' => 'ad1',
            'last_name' => 'theAd1',
            'accountType' => AccountTypeEnum::ADMIN,
            'active' => true,
            'amka' => '123456785',
            'address' => 'street 123',
            'mobile_phone' => '22227777777777',
            'home_phone' => '222233334444',
            'gender' => GenderEnum::MALE,
            'email' => 'ad1@hotmail.com',
            'password' => Hash::make('123456')
        ]);

        // consult1
        \App\Models\Consultation::create([
            'consultationMsg' => 'not good',
            'isRead' => true,
            'registerDate' => now(),
            'user_id' => 4,
        ]);

        // consult2
        \App\Models\Consultation::create([
            'consultationMsg' => 'no more sweets for you',
            'isRead' => false,
            'registerDate' => now(),
            'user_id' => 4,
        ]);


        // consult3
        \App\Models\Consultation::create([
            'consultationMsg' => 'very good nutrition',
            'isRead' => false,
            'registerDate' => now(),
            'user_id' => 5,
        ]);


        // measurement1
        \App\Models\Measurement::create([
            'bloodGlucoseLevel' => 10,
            'carbIntake' => 1000,
            'measurementDate' => now()->addDay(-2),
            'user_id' => 4
        ]);

        // measurement2
        \App\Models\Measurement::create([
            'bloodGlucoseLevel' => 11,
            'carbIntake' => 1200,
            'measurementDate' => now()->addDay(-1),
            'user_id' => 4
        ]);


        // measurement3
        \App\Models\Measurement::create([
            'bloodGlucoseLevel' => 13,
            'carbIntake' => 700,
            'measurementDate' => now()->addDay(-3),
            'user_id' => 5
        ]);

        // measurement3
        \App\Models\Measurement::create([
            'bloodGlucoseLevel' => 9,
            'carbIntake' => 800,
            'measurementDate' => now()->addDay(-2),
            'user_id' => 5
        ]);

        // associations
        \App\Models\PatientDoctorAssociation::create([
            'patient_id' => 5,
            'doctor_id' => 1,
        ]);

        // associations
        \App\Models\PatientDoctorAssociation::create([
            'patient_id' => 4,
            'doctor_id' => 2,
        ]);

         // pending doc
         \App\Models\User::create([
            'first_name' => 'dr-pen',
            'last_name' => 'theDr-pen',
            'accountType' => AccountTypeEnum::DOC_PENDING,
            'active' => true,
            'amka' => '123456880',
            'address' => 'street free',
            'mobile_phone' => '22227777777777',
            'home_phone' => '222233334444',
            'gender' => GenderEnum::MALE,
            'email' => 'drPen@hotmail.com',
            'password' => Hash::make('123456')
        ]);
    }
}
