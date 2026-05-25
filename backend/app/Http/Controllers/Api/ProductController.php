<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        // クエリパラメータから category_id を取得する
        $categoryId = (int) $request->query('category_id', 0);

        // Product モデルから、全ての商品情報を取得して、id の昇順で並び替え
        $query = Product::query()->orderBy('id');

        if ($categoryId > 0) {
            // category_id あれあば絞り込む
            $query->where('category_id', $categoryId);
        }

        // クエリを実行して、商品情報を取得
        $products = $query->get();

        // TODO: 取得した商品情報を JSON 形式で返す
        // return response()->json([]);
        return response()->json([
            'status' => 'success',
            'data' => $products,
            'products' => $products,
        ], options: JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
}
