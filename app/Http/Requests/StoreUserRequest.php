<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'username' => 'required|unique:App\Models\User,username|string',
            'email' => 'required|email|string',
            'name' => 'required|string',
            'password' => 'required',
            'bio' => 'nullable',
            'roles' => 'required',
            'status' => 'required'
        ];
    }
}
