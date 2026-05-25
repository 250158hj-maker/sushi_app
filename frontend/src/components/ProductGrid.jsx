import LoadingOverlay from './LoadingOverlay';
import ProductCard from './ProductCard';

export default function ProductGrid({ disabled, loading, products, onSelectProduct }) {
  if (!products.length) {
    return (
      <>
        {loading ? <LoadingOverlay message="商品を読み込んでいます..." /> : null}
        <div className="grid min-h-56 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white/70 text-slate-500">
          このカテゴリの商品はまだありません。
        </div>
      </>
    );
  }

  return (
    <>
      {loading ? <LoadingOverlay message="商品を読み込んでいます..." /> : null}
      <div className="grid grid-cols-4 gap-2">
        {products.map((product) => (
          // TODO: ProductCard コンポーネントを使用して、商品を表示
          // Props: key, disabled, product, onSelectProduct
          <div>ProductCard コンポーネントを表示</div>
        ))}
      </div>
    </>
  );
}
