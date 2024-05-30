<?php

namespace App\Repositories;

use App\Models\EthereumAdress;

class EthereumAddressRepository {
    public function getAll() {
        return EthereumAdress::all();
    }

    public function getDataByUserId(string $user_id) {
        return EthereumAdress::whereUserId($user_id)->first();
    }

    public function createData(array $data) {
        return EthereumAdress::firstOrCreate([
            'user_id' => $data['user_id'],
            'address' => $data['address'],
        ], $data);
    }
}