<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerifikasiController extends Controller
{
    public function index(Request $request)
    {
        if (isset($request->hash)) {
            $hash = $request->hash;
        } else {
            $hash = null;
        }
        return Inertia::render("Verifikasi/Index", [
            "title" => "Verifikasi",
            "document" => $this->getDocument($hash),
            "filtered" => $request->hash ?? "",
        ]);
    }

    public function getDocument($hash) {
        $document = Document::query()
            ->whereHash($hash)
            ->first();

        if ($document) {
            return $document;
        } else {
            return null;
        }
    }

    public function show($hash) {
        $document = Document::query()
            ->where("signed_at", "!=", null)
            ->whereHash($hash)
            ->first();

        return Inertia::render("Verifikasi/Show", [
            "title" => $document ? $document->perihal : "Document Not Found",
            "documents" => $document ? $document : "not found"
        ]);
    }
}
