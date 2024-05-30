<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Iqbal Muhammad Fajar N, Alam Rahmatulloh">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link rel="icon" href="/images/favicon.ico" sizes="32x32" />

    <!-- meta -->
    <meta property="og:locale" content="id_ID" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="Digital Signature in Blockchain (SignDocu)" />
    <meta property="og:url" content="{{ env('APP_URL') }}" />
    <meta property="og:site_name" content="{{ env('APP_NAME') }}" />
    <meta property="og:image" content="/images/logo_512x512.png" />
    <meta name="description"
        content="Digital Signature in Blockchain (SignDocu) adalah aplikasi layanan sertifikat elektronik dibawah pengelolaan Program Studi Informatika, Fakultas Teknik, Universitas Siliwangi. Aplikasi tersebut merupakan hasil riset tahun 2023" />
    <meta name="keywords"
        content="unsil, sidigs, digital signature, tanda tangan, tanda tangan digital, universitas siliwangi, informatika" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body>
    @inertia

    <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.3.5/dist/web3.min.js"></script>
</body>

</html>
