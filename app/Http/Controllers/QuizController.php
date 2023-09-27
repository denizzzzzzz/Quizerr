<?php

namespace App\Http\Controllers;

use App\Models\Openquestion;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    // Methode voor het weergeven van de vragenpagina
    public function index()
    {
        // Haal alle vragen op uit de database
        $openquestion = Openquestion ::all();
        $questions = Question::all();
   
       
        // Render de vragenpagina met de vragen als data
        return Inertia::render('Quiz/QuizComponent', [
            'questions' => $questions,
            'open_questions' => $openquestion,

        ]);
    }

}
