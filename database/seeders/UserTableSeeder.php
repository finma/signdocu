<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'name'      => 'Super Admin',
            'email'     => 'sidigs@santren.id',
            'password'  => Hash::make('gehulada')
        ];
        $user = User::create($data);
        $user->assignRole('Super Admin');
    }
}
