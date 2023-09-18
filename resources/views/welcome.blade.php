<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Russo+One&display=swap" rel="stylesheet">
        <title>Quizerr</title>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <header>
            <ul>
                <li><a href="{{ url('/') }}">Q </a></li>
                <li>FAQ</li>
                <li>Quiz</li>
                <li>Extra uitleg</li>
                       @if (Route::has('login'))
                    @auth
                    <li> <a href="{{ url('/dashboard') }}" >Dashboard</a></li>
                       
                    @else
                    <li> <a href="{{ route('login') }}" >Login</a></li>
                        @if (Route::has('register'))
                        <li>
                            <a href="{{ route('register') }}" >Registreer</a>
                            </li>
                        @endif
                    @endauth
                </div>
            @endif
        </ul>
        </header>
    <body> 
        <div >
     
        
        <div class="banner">
            <div class="slogan-container">
            <h1>Quizerr</h1>
            <h4>Waar kennis getest word.</h4>
            </div>
            <button>Starten</button>
        </div>
      
    </body>
</html>
