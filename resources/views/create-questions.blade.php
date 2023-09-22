@extends('layouts.app')

@section('content')
<div class="dashboard">
    <div class="dashboard-container">
                @foreach($questions as $question)
                <div>
                    <ul>
                       <li> {{ $question->question }}</li>
                    </ul>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
@endsection
