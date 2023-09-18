<header>
    <ul>
        <li><a href="{{ url('/') }}"><img src="{{ asset('img/logo-quizer.svg') }}" alt="Quizzer Logo" /></a></li> 
        @if (Route::has('login'))
        @auth
        <li>Technische hulp</li>
        <li class="auth-button">
        <form id="logout-form" action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit">Uitloggen</button>
                </form>
                </li>
        @else
        <li>FAQ</li>
        <li>Quiz</li>
        <li>Extra-uitleg</li>
        <li class="auth-button"> <a href="{{ route('login') }}">Inloggen</a></li>
        @endauth
        </div>
        @endif
    </ul>
</header>