<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\EthereumAddressService;
use Illuminate\Http\Request;

class EthereumAddressController extends Controller
{
    protected $ethereumAddressService;

    public function __construct(EthereumAddressService $ethereumAddressService) {
        $this->ethereumAddressService = $ethereumAddressService;
    }

    public function index() {
        $data = $this->ethereumAddressService->getAll();

        return $this->sendResponse($data, "Berhasil mendapatkan data ethereum address");
    }

    public function store(Request $request) {
        $input = $request->all();
        $input['user_id'] = $request->user()->id;

        try {
            $store = $this->ethereumAddressService->create($input);
            return $this->sendResponse($store, "Berhasil menyimpan data ethereum address");
        } catch (\Throwable $th) {
            return $this->sendError("Gagal menyimpan data ethereum address", $th->getMessage());
        }

    }
}
