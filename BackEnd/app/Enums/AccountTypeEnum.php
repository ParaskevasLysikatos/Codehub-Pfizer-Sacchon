<?php
namespace App\Enums;

enum AccountType: string
{
    case ADMIN = 1;
    case DOCTOR = 2;
    case PATIENT = 3;
}
