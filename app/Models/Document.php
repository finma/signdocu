<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with = ['signer'];

    public function signer() {
        return $this->belongsTo(Certificate::class, 'user_id', 'user_id');
    }

    public function ethereum_address() {
        return $this->belongsTo(EthereumAdress::class, 'ethereum_address_id', 'id');
    }
}
