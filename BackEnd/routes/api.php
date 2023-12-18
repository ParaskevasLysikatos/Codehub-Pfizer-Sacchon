<?php

use App\Http\Controllers\AuthController;
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
});

