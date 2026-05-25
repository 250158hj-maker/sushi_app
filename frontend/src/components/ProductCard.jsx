import { buildAssetUrl } from '../utils/assetUrl';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ disabled, onSelectProduct, product }) {
  return (
    <button
      type="button"
      className="cursor-pointer overflow-hidden rounded-3xl border border-slate-200 text-center shadow-[0_24px_60px_rgba(32,76,112,0.12)] transition duration-150 enabled:hover:-translate-y-1 enabled:hover:shadow-[0_28px_70px_rgba(32,76,112,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
      disabled={disabled}
      onClick={() => onSelectProduct(product)}
    >
      <div className="p-2 pb-0">
        <div className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl">
          {/* TODO: 商品画像を表示: buildAssetUrl() を使用 */}
          <img
            className="h-full w-full object-contain"
            src=""
            alt={product.name}
          />
        </div>
        <div className="pb-2 text-sm font-semibold text-slate-600">
          {/* TODO: 価格を表示 */}
        </div>
      </div>
      <div className="bg-sky-600 px-3 py-2 text-base font-semibold leading-6 text-white">
        {/* TODO: 商品名を表示 */}
      </div>
    </button>
  );
}
