<?php

namespace App\Enums;

use BenSampo\Enum\Enum;
use Illuminate\Validation\Rules\Enum as RulesEnum;

final class AccountTypeEnum extends RulesEnum
{
    const ADMIN =  1;
    const DOCTOR = 2;
    const PATIENT = 3;
    const DOC_PENDING = 4;
}
