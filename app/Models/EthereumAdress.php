<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EthereumAdress extends Model
{
    use HasFactory;
    protected $table = 'ethereum_addresses';
    protected $guarded = [];
    protected $with = ['user'];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
