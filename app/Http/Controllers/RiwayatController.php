<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RiwayatController extends Controller
{
    public function index(Request $request)
    {
        $query = Document::query()
            ->where("signed_at", "!=", null);
        if (!in_array("Super Admin", $request->user()->getRoleNames()->toArray())) {
            $query->whereUserId($request->user()->id);
        }
        if ($request->q) {
            $query->where('perihal', 'like', '%' . $request->q . '%');
        }
        $histories = $query->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render("Riwayat/Index", [
            "title" => "Riwayat",
            "histories" => $histories,
            "filtered" => $request ?? [
                "q" => $request->q ?? "",
                "page" => $request->page ?? 1
            ],
        ]);
    }

    public function show(Document $document)
    {
        return Inertia::render("Riwayat/Show", [
            "title" => $document->perihal,
            "documents" => $document,
        ]);
    }

    public function destroy(Request $request, Document $document)
    {
        try {
            $document->delete();
            if ($document) {
                $path = "/document/" . $document->hash . ".pdf";
                if (Storage::exists($path)) {
                    Storage::delete($path);
                }
            }
        } catch (\Throwable $th) {
            return $this->sendError("Gagal, ada kesalahan saat mengirim data.", $th->getMessage());
        }
    }
}
