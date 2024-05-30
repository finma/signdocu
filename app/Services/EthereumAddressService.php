<?php

namespace App\Services;

use App\Repositories\EthereumAddressRepository;
use Illuminate\Http\Request;

class EthereumAddressService {
    protected $ethereumAddress;

    public function __construct(EthereumAddressRepository $ethereumAddress) {
        $this->ethereumAddress = $ethereumAddress;
    }

    public function getAll() {
        return $this->ethereumAddress->getAll();
    }

    public function getDataByUserId(string $user_id) {
        return $this->ethereumAddress->getDataByUserId($user_id);
    }

    public function create(array $data) {
        return $this->ethereumAddress->createData($data);
    }
}