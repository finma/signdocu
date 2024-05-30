<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\API\DocumentController;
use App\Http\Controllers\API\EthereumAddressController;
use App\Http\Controllers\Auth\Socialite\LoginController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfilController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RiwayatController;
use App\Http\Controllers\SignController;
use App\Http\Controllers\VerifikasiController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/cekfile', function () {
    // $url = Storage::disk('public')->url('/document/QO0xpzaq2KlL4xLV5RJEGZBYM.pdf');
    // return $url;
    App::call('App\Http\Controllers\SignController@cetakQrCode');
})->name('cekfile');

Route::get('/cek-hash/{hash}', [SignController::class, 'storeHashOnEthereum']);
Route::get('/cek-hash/v2/{hash}', [SignController::class, 'signDocument']);
Route::get('/cek-transaction/{hash}', [SignController::class, 'checkTransactionStatus']);
Route::get('/cek-verification/{hash}', [SignController::class, 'verifyFileOnBlockchain']);
Route::get('/get-transaction', [SignController::class, 'getTransaction']);

Route::get('/storage-link', function () {
    Artisan::call('storage:link');
});

Route::get('/docx-to-pdf', function () {
    return Inertia::render('DocToPdf');
});

// api
Route::prefix('api')->name('api.')->group(function () {
    Route::resource('ethereum', EthereumAddressController::class);
    Route::get('document/blockchain-hash/{hash}', [DocumentController::class, 'blockchain_hash'])->name('document.blockchain-hash');
    Route::resource('document', EthereumAddressController::class);
});

Route::get('/', function () {
    return Inertia::render('SplashScreen');
})->name('splashscreen');

Route::get('/home', HomeController::class)->name('home');
Route::prefix('sign')->middleware(['auth', 'role:User', 'checkCertificate'])->name('sign.')->group(function () {
    // Route::prefix('sign')->middleware(['auth', 'role:User'])->name('sign.')->group(function () {
    Route::get('/', [SignController::class, 'index'])->name('index');
    Route::post('/update_qrcode', [SignController::class, 'update_qrcode'])->name('update_qrcode');
    Route::post('/handle_sign', [SignController::class, 'handle_sign'])->name('handle_sign');
});
Route::prefix('verifikasi')->name('verifikasi.')->group(function () {
    Route::get('/', [VerifikasiController::class, 'index'])->name('index');
    Route::get('{hash}', [VerifikasiController::class, 'show'])->name('verifikasi.show');
});

Route::prefix('riwayat')->middleware('auth')->name('riwayat.')->group(function () {
    Route::get('/', [RiwayatController::class, 'index'])->name('index');
    Route::get('{document:hash}', [RiwayatController::class, 'show'])->name('show');
    Route::delete('{document}', [RiwayatController::class, 'destroy'])->name('destroy');
});
Route::prefix('profil')->middleware(['auth', 'role:User'])->name('profil.')->group(function () {
    Route::get('/', [ProfilController::class, 'index'])->name('index');
    Route::post('submit_profil', [ProfilController::class, 'submit_profil'])->name('submit_profil');
    Route::post('submit_sertifikat', [ProfilController::class, 'submit_sertifikat'])->name('submit_sertifikat');
    Route::post('submit_file_sertifikat', [ProfilController::class, 'submit_file_sertifikat'])->name('submit_file_sertifikat');
    Route::post('submit_password', [ProfilController::class, 'submit_password'])->name('submit_password');
});
Route::get('/about', AboutController::class)->name('about');

// Auth Socialite
Route::prefix('login')->name('login.')->group(function () {
    Route::prefix('google')->name('google.')->group(function () {
        Route::get('/', [LoginController::class, 'google_login'])->name('index');
        Route::get('/callback', [LoginController::class, 'google_callback'])->name('callback');
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
