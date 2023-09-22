<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function index()
    {
        return Inertia::render('Quiz/ResultComponent');
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'student_name' => 'required|string|max:255',
            'student_id' => 'required|integer', // Validate student_id separately
            'answers' => 'required|array',
        ]);
    
        $studentName = $request->input('student_name');
        $studentId = $request->input('student_id'); // Access student_id separately
        $answers = $request->input('answers');
    
        foreach ($answers as $answer) {
            Result::create([
                'student_name' => $studentName,
                'student_id' => $studentId, // Use the student_id here
                'question_id' => $answer['question_id'],
                'selected_answer' => $answer['selected_answer'],
            ]);
        }
    
        return response()->json(['message' => 'Data received and processed successfully']);
    }
    
    
}






