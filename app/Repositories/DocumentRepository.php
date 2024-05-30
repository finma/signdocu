<?php

namespace App\Repositories;

use App\Models\Document;

class DocumentRepository {
    public function getDataByBlockChainHash(string $blockchainHash) {
        return Document::whereBlockchainDocumentHash($blockchainHash)->with('ethereum_address')->first();
    }
}