<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name', 'Quizerr') }}</title>
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cabin&display=swap" rel="stylesheet">
    </head>
    <body class="">
        <div class="login-container">
            <div>
            
                <a class="logo-login" href="/">
                <img src="{{ asset('img/logo-quizer.svg') }}" alt="Quizzer Logo" />
                <h3>Quizerr</h3>
                </a>
                <h1>Welkom terug!</h1>
            </div>

            <div class="">
                {{ $slot }}
            </div>
        </div>
    </body>
</html>
