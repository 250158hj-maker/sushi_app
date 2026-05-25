<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Visit extends Model
{
    protected $fillable = [
        'seat_id',
        'status',
        'total',
        'total_with_tax',
    ];

    protected function casts(): array
    {
        return [
            'seat_id' => 'integer',
            'total' => 'integer',
            'total_with_tax' => 'integer',
        ];
    }

    protected function statusLabel(): Attribute
    {
        return Attribute::make(
            get: fn() => match ($this->status) {
                'seated' => '🪑 着席',
                'billed' => '🧾 会計済',
                'paid' => '✅ 支払い済',
                default => $this->status,
            },
        );
    }

    public function seat(): BelongsTo
    {
        return $this->belongsTo(Seat::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
