<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Certificate;
use Inertia\Inertia;

class CheckCertificate
{
    public function handle($request, Closure $next)
    {
        $user_id = $request->user()->id;
        
        $certificate = Certificate::whereUserId($user_id)->first();

        if (!$certificate) {
            return redirect()->route('profil.index', [
                "tab" => "sertifikat"
            ]);
        }

        return $next($request);
    }
}