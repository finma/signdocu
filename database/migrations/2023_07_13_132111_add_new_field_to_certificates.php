<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->string('jabatan')->nullable()->after('lembaga');
            $table->string('file_crt')->nullable()->after('jabatan');
            $table->string('file_p12')->nullable()->after('file_crt');
            $table->string('file_key')->nullable()->after('file_p12');
            $table->dateTime('expired_at')->nullable()->after('file_key');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('certificate', function (Blueprint $table) {
            $table->dropColumn(['jabatan', 'file_crt', 'file_p12', 'file_key', 'expired_at']);
        });
    }
};
