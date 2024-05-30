<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\DocumentService;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    protected $documentService;

    public function __construct(DocumentService $documentService) {
        $this->documentService = $documentService;
    }

    public function blockchain_hash($hash) {
        $data = $this->documentService->getDataByBlockchainHash($hash);

        if ($data) {
            return $this->sendResponse($data, "Berhasil mendapatkan dokumen by blockchain document hash");
        }

        return $this->sendError("dokumen tidak ditemukan", [], 404);
    }
}
