<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'is_completed', 'category_id'];

    protected $casts = [
        'is_completed' => 'boolean',
    ];

    /**
     * A task belongs to a single category.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
