<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * @return Attribute
     */
    protected function id(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Crypt::encryptString($value),
//            set: fn (string $value) => strtolower($value),
        );
    }
}
