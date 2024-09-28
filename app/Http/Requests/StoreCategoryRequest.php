<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
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
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|unique:App\Models\Category,name|string',
            'slug' => 'required|unique:App\Models\Category,slug|string',
            'description' => 'nullable',
            'image' => [
                'required',
                'extensions:jpg,bmp,webp,svg,png',
                'mimes:jpg,bmp,webp,svg,png',
                // 'dimensions:ratio=3/2'
            ],
            'status' => 'required',
        ];
    }
}
