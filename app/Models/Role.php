<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Crypt;

class Role extends Model
{
    use HasFactory;

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['id_enc'];

    protected $hidden = ['id'];

    /**
     * get permissions with role
     * @return BelongsToMany
     */
    public function permissions(): BelongsToMany {
        return $this->belongsToMany(Permission::class, 'role_has_permissions');
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
