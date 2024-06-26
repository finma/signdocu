<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with = ['user'];

    protected $hidden = [
        'passphrase',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
