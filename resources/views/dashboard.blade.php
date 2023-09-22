@extends('layouts.app')

@section('content')
<div class="dashboard">
    <div class="dashboard-container">
        <div class="student-info-block">
            <div class="student-info">
                <?php $currentStudentId = null; ?> {{-- Initialize $currentStudentId --}}
                @foreach ($results as $result)
                @if ($result->student_id !== $currentStudentId)
                {{-- Display student name --}}
                <h2>{{ $result->student_name }}</h2>
                <?php $currentStudentId = $result->student_id; ?>
                @endif
                @unless (!$question = $questions->firstWhere('question_id', $result->question_id))
                <div class="question-container">
                    <p>{{ $question->question }}</p>
                    <ul class="answer-list">
                        <li>A: {{ $question->answer_a }}</li>
                        <li>B: {{ $question->answer_b }}</li>
                        <li>C: {{ $question->answer_c }}</li>
                    </ul>
                    <p>Antwoord gekozen: {{ $result->selected_answer }}</p>
                    <p>Het goede antwoord was: {{ $question->correct_answer }}</p>
                </div>
                @endunless
                @endforeach
            </div>
        </div>
        <div class="upload-block">
            <h1>Upload uw vragen hier</h1>
            <form action="/upload" method="POST" enctype="multipart/form-data" id="upload-form">
                @csrf
                <label for="csv_file" class="custom-file-upload">
                    <input type="file" id="csv_file" name="csv_file">
                    <span>Bestand kiezen</span>
                </label>
                <button type="submit" class="upload-button">Upload uw Vragen</button>
            </form>
        </div>
    </div>
</div>
@endsection
