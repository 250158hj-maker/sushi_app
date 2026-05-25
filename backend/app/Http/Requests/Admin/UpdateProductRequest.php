<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class UpdateProductRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $product = $this->route('product');

        $this->merge([
            'id' => is_object($product) ? $product->id : $product,
        ]);
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => ['required', 'integer', 'exists:products,id'],
            'name' => ['required', 'string', 'max:100'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'price' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'image'],
        ];
    }

    /**
     * 画像を保存して、データベースに保存するためのパスを返す
     */
    public function storeImage(): ?string
    {
        // リクエストに 'image' ファイルが含まれていない場合は null を返す
        if (!$this->hasFile('image')) {
            return null;
        }

        $file = $this->file('image');
        $directory = public_path('images/products');

        if (!is_dir($directory)) {
            mkdir($directory, 0777, true);
        }

        $filename = Str::uuid()->toString().'.'.$file->getClientOriginalExtension();
        $file->move($directory, $filename);

        return 'images/products/'.$filename;
    }
}
