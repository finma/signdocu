<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProfilController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render("Profil/Index", [
            "title" => "Profil",
            "tab" => $request->tab ? $request->tab : "profil",
        ]);
    }

    public function checkPassphrase($passphrase_lama, $passphrase)
    {
        if (Hash::check($passphrase_lama, $passphrase)) {
            return true;
        } else {
            return false;
        }
    }

    public function submit_profil(Request $request)
    {
        $request->validate([
            "name" => "required",
            "email" => "required|min:6",
            "avatar_update" => "nullable|image"
        ]);

        $input = $request->except(['avatar', 'avatar_update']);

        try {
            if ($request->hasFile('avatar_update')) {
                if (Storage::exists('public/profil/' . $request->user()->avatar)) {
                    Storage::delete('public/profil/' . $request->user()->avatar);
                }

                $request->file('avatar_update')->storeAs('profil', $request->user()->id . "-" . Str::slug($request->name) . "." . $request->file('avatar_update')->getClientOriginalExtension(), 'public');

                $input['avatar'] = env('APP_URL') . "/storage/profil/" . $request->user()->id . "-" . Str::slug($request->name) . "." . $request->file('avatar_update')->getClientOriginalExtension();
            }

            $request->user()->update($input);
        } catch (\Throwable $th) {
            session()->flash('error', 'Gagal, ada kesalahan pada server ketika mengirim data.' . $th->getMessage());
            return redirect()->back()->with('flash', session('flash'));
        }
    }

    public function submit_sertifikat(Request $request)
    {
        // cek sertifikast
        $certificate = Certificate::whereUserId($request->user()->id)->first();

        if ($certificate) {
            if ($request->ubah_passphrase != null) {
                $request->validate([
                    "lembaga" => "required",
                    "passphrase" => "required|min:6",
                    // "passphrase_lama" => "required",
                    "ulangi_passphrase" => "required|same:passphrase",
                ]);

                // cek passphrase lama
                // kalau passphrase berubah, sertifikat yang lama akan dihapus
                $checkPassphrase = $this->checkPassphrase($request->passphrase, $certificate->passphrase);
                if (!$checkPassphrase) {
                    $certificate->update([
                        'file_crt' => null,
                        'file_p12' => null,
                        'file_key' => null,
                        'expired_at' => null,
                    ]);
                }

                $data = [
                    "lembaga" => $request->lembaga,
                    "jabatan" => $request->jabatan,
                    "passphrase" => Hash::make($request->passphrase)
                ];
            } else {
                $request->validate([
                    "lembaga" => "required",
                ]);

                $data = [
                    "lembaga" => $request->lembaga,
                    "jabatan" => $request->jabatan,
                ];
            }
        } else {
            $request->validate([
                "lembaga" => "required",
                "passphrase" => "required|min:6",
                "ulangi_passphrase" => "required|same:passphrase",
            ]);

            $data = [
                "lembaga" => $request->lembaga,
                "jabatan" => $request->jabatan,
                "passphrase" => Hash::make($request->passphrase)
            ];
        }

        try {
            Certificate::updateOrCreate([
                "user_id" => $request->user()->id
            ], $data);

            session()->flash('success', 'Data sertifikat berhasil disimpan.');
            return redirect()->back()->with('flash', session('flash'));
        } catch (\Throwable $th) {
            return $this->sendError("Gagal, ada kesalahan saat mengirim data.", $th->getMessage());
        }
    }

    public function submit_file_sertifikat(Request $request)
    {
        $request->validate([
            "file_crt" => "required",
            "file_p12" => "required",
            "file_key" => "required",
        ]);

        $input = $request->except(['file_crt', 'file_p12', 'file_key']);
        
        // cek user sertifikat
        $user = User::with('certificate')->find($request->user()->id);

        try {
            // file_crt
            if ($request->hasFile('file_crt')) {
                $name_file_crt = $request->file('file_crt')->getClientOriginalName();
                $request->file('file_crt')->storeAs('sertifikat/'.$user->certificate->hash, $name_file_crt, 'public');

                $input['file_crt'] = $name_file_crt;
            }

            // file_p12
            if ($request->hasFile('file_p12')) {
                $name_file_p12 = $request->file('file_p12')->getClientOriginalName();
                $request->file('file_p12')->storeAs('sertifikat/'.$user->certificate->hash, $name_file_p12, 'public');

                $input['file_p12'] = $name_file_p12;
            }

            // file_key
            if ($request->hasFile('file_key')) {
                $name_file_key = $request->file('file_key')->getClientOriginalName();
                $request->file('file_key')->storeAs('sertifikat/'.$user->certificate->hash, $name_file_key, 'public');

                $input['file_key'] = $name_file_key;
            }

            if ($input['file_crt'] !== '' || $input['file_p12'] !== '' || $input['file_key'] !== '') {
                $input['expired_at'] = Carbon::now()->addYear()->toDateString();
            }

            $user->certificate->update($input);

            session()->flash('success', 'File sertifikat berhasil disimpan.');
            return redirect()->back()->with('flash', session('flash'));
        } catch (\Throwable $th) {
            session()->flash('error', 'Gagal, ada kesalahan pada server ketika mengirim data.' . $th->getMessage());
            return redirect()->back()->with('flash', session('flash'));
        }
    }

    public function submit_password(Request $request)
    {
        $request->validate([
            "password" => [
                'required',
                'string',
                'min:8',             // harus memiliki setidaknya 8 karakter
                'regex:/[A-Z]/',     // harus memiliki setidaknya satu huruf besar
                'regex:/[0-9]/',
                'confirmed'
            ]
        ], [
            'password.regex' => 'Password harus memiliki setidaknya satu satu huruf kapital, dan satu angka.'
        ]);

        // baca user
        $user = User::find($request->user()->id);

        try {
            $user->update([
                'password' => Hash::make($request->password)
            ]);
        } catch (\Throwable $th) {
            return $this->sendError("Gagal, ada kesalahan saat mengirim data.", $th->getMessage());
        }
    }
}
