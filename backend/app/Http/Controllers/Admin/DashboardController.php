<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Visit;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $now = Carbon::now();

        $monthlySales = 0;
        // TODO: Visit モデルから、今月の売上合計を算出する
        // SQL: SELECT SUM(total_with_tax) FROM visits 
        //          WHERE status = 'paid' AND created_at = xxx 
        // $monthlySales = (int) Visit::query()
        //     ->where('status', 'paid')
        //     ->whereYear('created_at', $now->year)
        //     ->whereMonth('created_at', $now->month)
        //     ->sum('total_with_tax');

        $monthlyVisits = 0;
        // TODO: Visit モデルから、今月の来店数を算出
        // SQL: SELECT COUNT(*) FROM visits 
        //          WHERE status = 'paid' AND created_at = xxx 
        // $monthlyVisits = (int) Visit::query()
        //     ->whereYear('created_at', $now->year)
        //     ->whereMonth('created_at', $now->month)
        //     ->count();

        // ランキング
        $ranking = DB::table('orders as o')
            ->join('products as p', 'o.product_id', '=', 'p.id')
            ->join('visits as v', 'o.visit_id', '=', 'v.id')
            ->select('p.name', DB::raw('SUM(o.quantity) as total_qty'))
            ->whereYear('v.created_at', $now->year)
            ->whereMonth('v.created_at', $now->month)
            ->groupBy('o.product_id', 'p.name')
            ->orderByDesc('total_qty')
            ->limit(5)
            ->get();

        // ランキングの1位の数量を取得
        $rankingTopQuantity = (int) ($ranking->first()->total_qty ?? 0);

        return view('admin.dashboard.index', [
            'monthlySales' => $monthlySales,
            'monthlyVisits' => $monthlyVisits,
            'ranking' => $ranking,
            'rankingTopQuantity' => $rankingTopQuantity,
            'monthLabel' => sprintf('%d年%d月', $now->year, $now->month),
        ]);
    }
}
