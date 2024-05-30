<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function sendResponse($result, $message)
    {
        $response = [
            "success" => true,
            "message" => $message,
            "data"    => $result
        ];

        return response()->json($response, 200);
    }

    public function sendError($error, $errorMessage = [], $code = 402)
    {
        $response = [
            "success" => false,
            "message" => $error,
        ];

        if (!empty($errorMessage)) {
            $response['data'] = $errorMessage;
        }

        return response()->json($response, $code);
    }

    public function checkCertificate($user_id) {
        $certificate = Certificate::query()
            ->whereUserId($user_id)
            ->first();

        if (!$certificate) {
            return Inertia::render("Profile/Index");
        }
    }
}
