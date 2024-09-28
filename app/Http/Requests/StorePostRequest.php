<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'subtitle' => 'nullable|string',
            'slug' => 'required|unique:App\Models\Category,slug|string',
            'content' => 'required',
            'featured_image' => [
                'required',
                'extensions:jpg,bmp,webp,svg,png',
                'mimes:jpg,bmp,webp,svg,png',
                // 'dimensions:ratio=3/2'
            ],
            'read_hour' => 'nullable',
            'read_minute' => 'nullable',
            'read_second' => 'nullable',
            'is_featured' => 'required',
            'categories' => 'required',
            'tags' => 'required',
            'is_published' => 'required',
        ];
    }
}
