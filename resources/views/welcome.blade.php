@extends('layouts.app')
@section('content')
<div>
    <div class="banner">
        <div class="slogan-container">
            <h1>Quizerr</h1>
            <h2>Waar kennis getest word.</h2>
        </div>
      
        <button class="cta_main_button"> <a href="{{ route('quiz') }}"> Start de Quiz</a></button>
    </div>
    <div class="cta_container">
        <h2 class="big-title">Learn, Review, Repeat</h2>
        <div class="steps-container">
            <div>
                <img src="{{ asset('img/Learn-Image.svg') }}" alt="Learning Image" />
                <h2>Learn</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and </p>
            </div>
            <div>
                <img src="{{ asset('img/Review-Image.svg') }}" alt="Review Image" />
                <h2>Review</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and </p>
            </div>
            <div>
                <img src="{{ asset('img/Repeat-Image.svg') }}" alt="Repeat Image" />
                <h2>Repeat</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and </p>
            </div>
        </div>
        <button class="cta_button">Start de Quiz</button>
    </div>
    <div class="quote">
        <h1>“You don’t understand anything until you learn it more than one way.”</h1>
    </div>
</div>
@endsection