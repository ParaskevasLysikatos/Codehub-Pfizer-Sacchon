<?php

namespace App\Enums;

use BenSampo\Enum\Enum;
use Illuminate\Validation\Rules\Enum as RulesEnum;

final class GenderEnum extends RulesEnum
{
    const MALE =  1;
    const FEMALE = 2;
    const NEUTRAL = 3;
}
