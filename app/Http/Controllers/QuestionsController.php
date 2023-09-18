<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class QuestionsController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|mimes:csv,txt',
        ]);

        if ($request->hasFile('csv_file')) {
            $file = $request->file('csv_file');
            $data = array_map('str_getcsv', file($file->getPathname()));

            // Check if the header row exists
            if (count($data) > 0) {
                // Skip the first row (header row) and start from index 1
                for ($i = 1; $i < count($data); $i++) {
                    // Check if the current row has enough columns
                    if (count($data[$i]) >= 6) {
                        Question::create([
                            'question_id' => $data[$i][0],
                            'question' => $data[$i][1],
                            'answer_a' => $data[$i][2],
                            'answer_b' => $data[$i][3],
                            'answer_c' => $data[$i][4],
                            'correct_answer' => $data[$i][5],
                        ]);
                    } else {
                        // Log an error for rows with insufficient columns
                        Log::error('Row ' . ($i + 1) . ' in the CSV file does not have enough columns.');
                    }
                }
            } else {
                // Log an error for an empty CSV file
                Log::error('The CSV file is empty.');
            }
        }

        return redirect('/')->with('success', 'CSV file uploaded and data inserted successfully');
    }
}
