<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Document;
use App\Services\EthereumAddressService;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpWord\TemplateProcessor;
use setasign\Fpdi\Tcpdf\Fpdi;
use setasign\Fpdi\Tcpdf\FpdiTcpdfException;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class SignController extends Controller
{
    protected $ethereumAddressService;

    public function __construct(EthereumAddressService $ethereumAddressService)
    {
        $this->ethereumAddressService = $ethereumAddressService;
    }

    public function index(Request $request)
    {
        return Inertia::render("Sign", [
            "title" => "Sign",
        ]);
    }

    public function update_qrcode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "file" => "required|mimes:pdf",
            "page" => "required|numeric",
            "x" => "required|numeric",
            "y" => "required|numeric",
        ]);

        if ($validator->fails()) {
            return $this->sendError("Validation Error.", $validator->errors());
        }

        DB::beginTransaction();
        try {
            // simpan file
            $document = Document::firstOrCreate(['user_id' => $request->user()->id, "signed_at" => null], [
                'user_id' => $request->user()->id,
            ]);

            if ($document) {
                if ($request->hasFile('file')) {
                    $request->file('file')->storeAs('document', $document->hash . '.pdf', 'public');
                }
            }

            $qrcode_string = env('APP_URL') . '/verifikasi/' . $document->hash;
            $this->cetakQrCode($document->hash, $qrcode_string, $request->page, $request->x, $request->y, $request->passphrase);
            // $this->addSignature($document->hash, 'iqbal2804');

            DB::commit();

            return $this->sendResponse($document, "QRCode berhasil diupdate.");
        } catch (\Throwable $th) {
            DB::rollBack();

            return $this->sendError("Gagal, ada kesalahan saat mengirim data.", $th->getMessage());
        }
    }

    public function getCertificate($user_id)
    {
        $certificate = Certificate::query()
            ->whereUserId($user_id)
            ->first();

        return $certificate;
    }

    public function cekPassphrase($user_id, $passphrase)
    {
        $certificate = Certificate::query()
            ->whereUserId($user_id)
            ->first();

        if ($certificate) {
            if (Hash::check($passphrase, $certificate->passphrase)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function handle_sign(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "perihal" => "required",
            "blockchain_signature" => "required",
            "blockchain_document_hash" => "required",
            // "file" => "required|mimes:pdf",
            "passphrase" => "required|min:6"
        ]);


        if ($validator->fails()) {
            session()->flash('error', 'Gagal, ada kesalahan saat mengirim data.');
            return Redirect::back()->withErrors($validator)->with('flash', session('flash'))->withInput();
        }

        // cek passphrase validation
        $cekPassphrase = $this->cekPassphrase($request->user()->id, $request->passphrase);
        if (!$cekPassphrase) {
            session()->flash('error', 'Passphrase yang Anda masukkan salah.');
            return redirect()->back()->with('flash', session('flash'));
        }

        DB::beginTransaction();
        try {
            $document = Document::query()
                ->whereUserId($request->user()->id)
                ->whereSignedAt(null)
                ->first();

            // baca ethereum address
            $eth_address = $this->ethereumAddressService->getDataByUserId($request->user()->id);

            // update data
            $document->update([
                'perihal' => $request->perihal,
                'ethereum_address_id' => $eth_address->id,
                'blockchain_document_hash' => $request->blockchain_document_hash,
                'blockchain_signature' => $request->blockchain_signature,
                'signed_at' => date('Y-m-d H:i:s')
            ]);

            // tambahkan sertifikat ke file yang ditandatangani (.pdf)
            // $this->addSignature($document->hash, $request->passphrase);

            DB::commit();

            session()->flash('success', "Dokumen berhasil ditanda tangani.");
            return redirect()->route('riwayat.show', $document->hash)->with('flash', session('flash'));
        } catch (\Throwable $th) {
            DB::rollBack();

            session()->flash('error', 'Gagal, ada kesalahan saat mengirim data.' . $th->getMessage());
            return redirect()->back()->with('flash', session('flash'));
        }
    }

    public function cetakQrCode($hash, $path, $page = 1, $x = 0, $y = 0, $passphrase = 'iqbal2804')
    {
        // Load PDF template
        $pdfPath = public_path('storage/document/' . $hash . '.pdf');
        $pdf = new Fpdi();
        $pageCount = $pdf->setSourceFile($pdfPath);

        // Set the page size to A4
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        // Generate QR Code
        $qrCodeText = $path;
        $qrCodeImage = QrCode::format('png')->size(300)->generate($qrCodeText);

        // Save QR Code image to disk
        Storage::disk('local')->put('/qrcode/' . $hash . '.png', $qrCodeImage);
        $qrCodeImagePath = public_path('storage/qrcode/' . $hash . '.png');

        // Set footer content
        $footerHtml = '
            <p style="font-size:6px">Dokumen ini sudah ditanda tangani secara elektronik menggunakan <b>sertifikat elektronik</b> yang diterbitkan Digital Signature in Blockchain (SignDocu)</p>
        ';

        // Iterate through each page of the PDF template
        for ($pageNumber = 1; $pageNumber <= $pageCount; $pageNumber++) {
            $pdf->AddPage('L', 'A4');
            // $pdf->AddPage('P', 'F4');

            // Import the template page
            $templateId = $pdf->importPage($pageNumber);
            $pdf->useTemplate($templateId);

            if ($pageNumber == $page) {
                // Add QR Code image to the PDF page
                $size = 22; // Size of QR Code
                $pdf->Image($qrCodeImagePath, $x, $y, $size, $size);
            }

            // Set footer on each page
            $pdf->setPageMark();

            // Set footer
            $pdf->SetAutoPageBreak(true, 0);
            $pdf->SetY(-8);
            $pdf->SetFont('courier', '', 8);
            $pdf->writeHTMLCell(0, 0, '', '', $footerHtml, 0, 0, false, true, 'C');
        }

        // cek apakah sudah terverifikasi & memiliki file .p12
        $userCertificate = $this->getCertificate(Auth::user()->id);

        // tambahkan sertifikat ke file yang ditandatangani (.pdf)
        if ($userCertificate->expired_at > Carbon::now()) {
            // Path ke file .p12
            $certificatePath = public_path('storage/sertifikat/' . $userCertificate->hash . '/' . $userCertificate->file_crt);
            $certificate = file_get_contents($certificatePath);

            // Path ke private key
            $privateKeyPath = public_path('storage/sertifikat/' . $userCertificate->hash . '/' . $userCertificate->file_key);
            $privateKey = file_get_contents($privateKeyPath);

            $certificatePassword = $passphrase;

            // Load the certificate
            // signature information
            $info = [
                'Name' => Auth::user()->name,
                'Email' => Auth::user()->email,
            ];

            // Set the certificate for signing
            if ($passphrase !== null) {
                $pdf->setSignature($certificate, $privateKey, $certificatePassword, '', 2, $info);
            }
        }

        // Save the final PDF with QR Codes
        $outputPath = public_path('storage/document/' . $hash . '.pdf');
        $pdf->Output($outputPath, 'F');
    }

    public function addSignature($hash, $passphrase)
    {
        // Load PDF template
        $pdfPath = public_path('storage/document/' . $hash . '.pdf');
        $pdf = new Fpdi();
        $pageCount = $pdf->setSourceFile($pdfPath);

        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        // Iterate through each page of the PDF template
        for ($pageNumber = 1; $pageNumber <= $pageCount; $pageNumber++) {
            $pdf->AddPage('P', 'A4');
            // $pdf->AddPage('P', 'F4');

            // Import the template page
            $templateId = $pdf->importPage($pageNumber);
            $pdf->useTemplate($templateId);
        }

        // cek apakah sudah terverifikasi & memiliki file .p12
        $userCertificate = $this->getCertificate(Auth::user()->id);

        // tambahkan sertifikat ke file yang ditandatangani (.pdf)
        if ($userCertificate->expired_at > Carbon::now()) {
            // Path ke file .p12
            $certificatePath = public_path('storage/sertifikat/' . $userCertificate->hash . '/' . $userCertificate->file_crt);
            $certificate = file_get_contents($certificatePath);

            // Path ke private key
            $privateKeyPath = public_path('storage/sertifikat/' . $userCertificate->hash . '/' . $userCertificate->file_key);
            $privateKey = file_get_contents($privateKeyPath);

            $certificatePassword = $passphrase;

            // Load the certificate
            // signature information
            $info = [
                'Name' => Auth::user()->name,
                'Email' => Auth::user()->email,
            ];

            // Set the certificate for signing
            $pdf->setSignature($certificate, $privateKey, $certificatePassword, '', 2, $info);
        }

        // Save the final PDF with signature
        $outputPath = public_path('storage/document/' . $hash . '.pdf');
        $pdf->Output($outputPath, 'F');

        // $this->storeHashOnEthereum($hash);
    }
}
