<?php

use App\Enums\AccountTypeEnum;
use App\Enums\GenderEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->enum('accountType', [AccountTypeEnum::ADMIN, AccountTypeEnum::DOCTOR, AccountTypeEnum::PATIENT,AccountTypeEnum::DOC_PENDING]);

            $table->string('first_name');
            $table->string('last_name');
            $table->boolean('active')->default(true);
            $table->string('address')->default('');
            $table->decimal('amka',11,0)->unique();
            $table->decimal('mobile_phone',20,0);
            $table->decimal('home_phone',20,0);

            $table->enum('gender', [GenderEnum::MALE, GenderEnum::FEMALE, GenderEnum::NEUTRAL]);
            $table->dateTime('last_login')->default(now());

            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
