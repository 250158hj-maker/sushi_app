<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\View\View;

class ProductController extends Controller
{
    public function index(): View
    {
        // カテゴリーIDを GETリクエストから取得
        $categoryId = request()->integer('category_id');

        // カテゴリーIDが0以下の場合は、nullに変換する
        $selectedCategoryId = $categoryId > 0 ? $categoryId : null;

        // TODO: カテゴリーリスト取得
        // SQL: SELECT * FROM categories ORDER BY sort_order, id
        $categories = Category::query()->orderBy('sort_order')->orderBy('id')->get();

        // TODO: Product モデルからデータを取得
        // SQL: SELECT * FROM products ORDER BY id
        $products = collect();

        // TODO: カテゴリーIDが指定されている場合は、カテゴリーIDで絞り込む
        // SQL: SELECT * FROM products WHERE category_id = $categoryId
        $products = Product::query()
            ->with('category')
            ->when($categoryId > 0, fn ($query) => $query->where('category_id', $categoryId))
            ->orderBy('id')
            ->get();

        // admin/product/index.blade.php に、データを渡して表示
        return view('admin.product.index', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategoryId' => $selectedCategoryId,
        ]);
    }

    public function create(): View
    {
        // カテゴリーリスト取得
        $categories = Category::query()->orderBy('sort_order')->orderBy('id')->get();
        // admin/product/create.blade.php に、データを渡して表示
        return view('admin.product.create', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        // TODO: POSTリクエストから、name, category_id, price を取得
        // $_POST['name'], $_POST['category_id'], $_POST['price'] から取得するイメージ
        // $data = $request->safe()->only(['name', 'category_id', 'price']);

        // TODO: 画像ファイルがアップロードされている場合は、画像を保存してパスを$dataに追加する
        // $_FILES['image'] から画像ファイルがアップロードされているか確認するイメージ
        // $data['image_path'] = $request->storeImage() ?? '';

        // TODO: Product モデルにデータを保存する
        // SQL: INSERT INTO products (name, category_id, price, image_path) 
        //      VALUES (:name, :category_id, :price, :image_path)
        // Product::query()->create($data);

        // 保存後は、商品一覧ページにリダイレクト
        // header('Location: admin/product/index') するイメージ
        return redirect()->route('admin.product.index');
    }

    // Product モデルから、$product のデータを自動取得している
    // 例: /admin/product/edit/1 にアクセスして、Product から ID=1 を自動取得
    public function edit(Product $product): View
    {
        $categories = Category::query()->orderBy('sort_order')->orderBy('id')->get();
        // admin/product/edit.blade.php に、データを渡して表示
        return view('admin.product.edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        // POSTリクエストから、name, category_id, price を取得
        $data = $request->safe()->only(['name', 'category_id', 'price']);

        // 画像ファイルがアップロードされている場合は、画像を保存してパスを$dataに追加
        $newImagePath = $request->storeImage() ?? null;
        if ($newImagePath !== null) {
            $data['image_path'] = $newImagePath;
        }

        // Product モデルの $product のデータを更新
        // SQL: UPDATE products 
        //      SET name = :name, category_id = :category_id, price = :price, image_path = :image_path 
        //      WHERE id = :id
        // $product->update($data);

        // 更新後は、商品一覧ページにリダイレクト
        return redirect()->route('admin.product.index');
    }

    public function destroy(Product $product): RedirectResponse
    {
        // TODO: Product モデルの $product を削除
        // SQL: DELETE FROM products WHERE id = :id
        // $product->delete();

        return redirect()->route('admin.product.index');
    }
}
