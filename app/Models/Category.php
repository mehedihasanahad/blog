<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Crypt;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['id_enc'];

    protected $hidden = ['id'];

    /**
     * get post with categories
     * @return BelongsToMany
     */
    public function posts(): BelongsToMany {
        return $this->belongsToMany(Post::class, 'post_categories', 'category_id', 'post_id');
    }

    /**
     * @return Attribute
     */
    protected function idEnc(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => Crypt::encryptString($attributes['id'])
        );
    }
}
