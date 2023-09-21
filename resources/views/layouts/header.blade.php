<header>
    <ul>
       
        @if (Route::has('login'))
        @auth
        <li><img src="{{ asset('img/logo-quizer.svg') }}" alt="Quizzer Logo" /></li> 
        <li>Technische hulp</li>
        <li class="auth-button">
        <form id="logout-form" action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit">Uitloggen</button>
                </form>
                </li>
        @else
        <li><img src="{{ asset('img/logo-quizer.svg') }}" alt="Quizzer Logo" /></li> 
        <li>FAQ</li>
        <li>Quiz</li>
        <li>Extra-uitleg</li>
        <li class="auth-button"> <a href="{{ route('login') }}">Inloggen</a></li>
        @endauth
        </div>
        @endif
    </ul>
</header>