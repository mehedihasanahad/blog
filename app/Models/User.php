<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Crypt;

class User extends Authenticatable
{
    use HasFactory, HasRoles;
    
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['id_enc'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];


    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return UserFactory::new();
    }

        /**
     * @return Attribute
     */
    protected function idEnc() : Attribute {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => Crypt::encryptString($attributes['id'])
        );
    }
}
