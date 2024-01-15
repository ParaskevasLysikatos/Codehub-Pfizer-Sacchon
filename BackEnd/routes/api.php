<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsultController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// public routes
Route::post('/login', [AuthController::class,'login']);
Route::put('/users', [AuthController::class,'register']); // 3

// protected routes
Route::group(['middleware'=> ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class,'logout']);

    Route::get('/users', [UserController::class,'getAllUsers']); //1
    Route::post('/users', [UserController::class,'unreadConsult']); //2

    Route::get('/measurements', [MeasurementController::class,'getSpecificMeasurement']); //4
    Route::post('/measurements', [MeasurementController::class,'addMeasurement']); //5
    Route::put('/measurements', [MeasurementController::class,'updateMeasurement']); //6
    Route::delete('/measurements', [MeasurementController::class,'deleteMeasurement']); //7
    Route::patch('/measurements', [MeasurementController::class,'dateMeasurement']); //8

    Route::get('/profile', [UserController::class,'getProfile']); //9
    Route::put('/profile', [UserController::class,'updateProfile']); //10
    Route::delete('/interacts', [UserController::class,'deleteProfile']); //11

    Route::get('/patient', [UserController::class,'getAllPatients']); //12
    Route::post('/patient', [MeasurementController::class,'getPatientMeasurements']); //13

    Route::get('/doctors', [UserController::class,'getAllDoctors']); //14

    Route::post('/interacts', [UserController::class,'findProfile']); //15

    Route::get('/associations', [UserController::class,'getAllassociations']); //16
    Route::put('/associations', [UserController::class,'UpdateAssociations']); //17
    Route::post('/associations', [UserController::class,'CreateAssociations']); //18

    Route::get('/expired', [UserController::class,'expired']); //19

    Route::get('/consultation', [ConsultController::class,'getConsultation']); //20
    Route::post('/consultation', [ConsultController::class,'createConsultation']); //21
    Route::put('/consultation', [ConsultController::class,'updateConsultation']); //22
    Route::delete('/consultation', [ConsultController::class,'deleteConsultation']); //23

});

