<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Vinkla\Hashids\Facades\Hashids;

class CertificateTableSeeder extends Seeder
{
    public function run()
    {
        Certificate::create([
            'user_id' => 2,
            'lembaga' => "Diskominfo Kab. Pangandaran",
            'passphrase' => Hash::make('gehulada'),
            'hash' => Hashids::encode(1)
        ]);
    }
}
