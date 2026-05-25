<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\OrderService;
use App\Models\Visit;
use Illuminate\Contracts\View\View;

class VisitController extends Controller
{
    public function __construct(private readonly OrderService $orderService)
    {
    }

    public function index(): View
    {
        $visits = collect();
        // TODO: Visit モデルから、全ての来店情報を取得して、updated_at の降順で並び替える
        // SQL: SELECT * FROM visits ORDER BY updated_at DESC
        // $visits = Visit::query()
        //     ->orderByDesc('updated_at')
        //     ->get();

        $checkoutHistory = collect();
        // TODO: Visit モデルから、来店情報を取得して、updated_at の降順で並び替える
        // SQL: SELECT * FROM visits WHERE status IN ('billed', 'paid') ORDER BY updated_at DESC
        // $checkoutHistory = Visit::query()
        //     ->whereIn('status', ['billed', 'paid'])
        //     ->orderByDesc('updated_at')
        //     ->get();

        return view('admin.visit.index', [
            'visits' => $visits,
            'checkoutHistory' => $checkoutHistory,
        ]);
    }

    public function show(Visit $visit): View
    {
        $orders = $this->orderService->fetchByVisitId($visit->id)->map(function ($order) {
            $order->line_total = (int) $order->price * (int) $order->quantity;
            return $order;
        });

        $decoratedVisit = $this->decorateVisit($visit);
        $decoratedVisit->subtotal = (int) $orders->sum('line_total');

        return view('admin.visit.show', [
            'visit' => $decoratedVisit,
            'orders' => $orders,
        ]);
    }

    private function decorateVisit(Visit $visit): Visit
    {
        $labels = [
            'seated' => '🪑 着席',
            'billed' => '🧾 会計済',
            'paid' => '✅ 支払い済',
        ];

        $visit->status_label = $labels[$visit->status] ?? $visit->status;

        return $visit;
    }
}
