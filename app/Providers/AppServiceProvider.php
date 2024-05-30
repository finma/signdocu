<?php

namespace App\Providers;

use App\Models\Certificate;
use App\Models\Document;
use Illuminate\Support\ServiceProvider;
use Vinkla\Hashids\Facades\Hashids;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        // document
        Document::creating(function ($model) {
            $model->hash = Hashids::encode($model->id);
            $model->dokumen = 'http://localhost:8000/storage/document/' . Hashids::encode($model->id) . '.pdf';
            $model->qrcode = 'http://localhost:8000/storage/qrcode/' . Hashids::encode($model->id) . '.png';
            // $model->dokumen = env('APP_URL') . '/storage/document/' . Hashids::encode($model->id).'.pdf';
            // $model->qrcode = env('APP_URL') . '/storage/qrcode/' . Hashids::encode($model->id).'.png';
        });

        Document::created(function ($model) {
            $model->hash = Hashids::encode($model->id);
            $model->dokumen = 'http://localhost:8000/storage/document/' . Hashids::encode($model->id) . '.pdf';
            $model->qrcode = 'http://localhost:8000/storage/qrcode/' . Hashids::encode($model->id) . '.png';
            // $model->dokumen = env('APP_URL') . '/storage/document/' . Hashids::encode($model->id).'.pdf';
            // $model->qrcode = env('APP_URL') . '/storage/qrcode/' . Hashids::encode($model->id).'.png';
            $model->save();
        });

        // certificate
        Certificate::creating(function ($model) {
            $model->hash = Hashids::encode($model->id);
        });

        Certificate::created(function ($model) {
            $model->hash = Hashids::encode($model->id);
            $model->save();
        });
    }
}
