<?php

namespace App\Http\Controllers\Auth\Socialite;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function google_login()
    {
        return Socialite::driver('google')->redirect();
    }

    public function google_callback()
    {
        $callback =  Socialite::driver('google')->user();
        $data = [
            'name'              => $callback->getName(),
            'email'             => $callback->getEmail(),
            'social_lite'       => "google",
            'avatar'            => $callback->getAvatar(),
            'email_verified_at' => date('Y-m-d H:i:s', time())
        ];

        $user = User::whereEmail($data['email'])->first();
        if (!$user) {
            $user = User::create($data);
            $user->assignRole('User');
            // Mail::to($user->email)->send(new AfterRegister($user));
        }
        Auth::login($user, true);

        session()->flash('auth', '');
        
        return redirect('/home');
    }
}
