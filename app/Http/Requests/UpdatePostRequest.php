<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
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
            'slug' => 'required|string',
            'content' => 'required',
            'categories' => 'required',
            'tags' => 'required',
            'read_hour' => 'nullable',
            'read_minute' => 'nullable',
            'read_second' => 'nullable',
            'is_featured' => 'required',
            'is_published' => 'required',
        ];
    }
}
