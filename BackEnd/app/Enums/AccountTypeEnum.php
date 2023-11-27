<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class AccountTypeEnum extends Enum
{
    const ADMIN =  1;
    const DOCTOR = 2;
    const PATIENT = 3;
}
