<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => rand(1,20),
            'title' => Str::random(10),
            'slug' => Str::random(3) . '_' . Str::random(3),
            'content' => Str::random(100),
            'featured_image' => Str::random(10) . '.jpg',
            'is_published' => 0,
        ];
    }
}
