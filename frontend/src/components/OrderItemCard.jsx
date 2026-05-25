import { buildAssetUrl } from '../utils/assetUrl';
import { formatPrice } from '../utils/formatPrice';

export default function OrderItemCard({ order }) {
  // TODO: 小計を計算: 単価 × 数量
  const totalPrice = 0;
  return (
    <article className="flex items-center justify-between gap-3 rounded-[20px] p-3">
      {order.product_image_path ? (
        <img
          className="h-[60px] w-[60px] flex-none rounded-2xl overflow-hidden object-contain"
          src={buildAssetUrl(order.product_image_path)}
          alt={order.product_name}
        />
      ) : (
        <div className="grid h-[60px] w-[60px] flex-none place-items-center rounded-2xl bg-sky-100 text-slate-400" />
      )}
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-slate-900">{order.product_name}</h3>
        <p className="mt-2 text-sm text-slate-500">{formatPrice(order.price)} / 1皿</p>
      </div>
      <div className="text-right max-sm:text-left">
        <span className="mb-1 block text-sm text-slate-500">×{order.quantity}</span>
        <strong className="text-base font-semibold text-slate-900">{formatPrice(totalPrice)}</strong>
      </div>
    </article>
  );
}
