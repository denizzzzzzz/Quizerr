<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class QuestionsController extends Controller
{
    // Methode voor het verwerken van het uploaden van een CSV-bestand
    public function upload(Request $request)
    {
        // Valideer het geüploade bestand om ervoor te zorgen dat het een CSV- of TXT-bestand is
        $request->validate([
            'csv_file' => 'required|mimes:csv,txt',
        ]);

        // Controleer of er daadwerkelijk een bestand is geüpload
        if ($request->hasFile('csv_file')) {
            $file = $request->file('csv_file');
            
            // Lees de inhoud van het CSV-bestand en converteer het naar een array
            $data = array_map('str_getcsv', file($file->getPathname()));

            // Controleer of er gegevens zijn in het CSV-bestand
            if (count($data) > 0) {
                for ($i = 1; $i < count($data); $i++) {
                    // Controleer of elke rij ten minste 6 kolommen heeft
                    if (count($data[$i]) >= 6) {
                        // Maak een nieuwe vraag aan op basis van de gegevens in de CSV
                        Question::create([
                            'question_id' => $data[$i][0],
                            'question' => $data[$i][1],
                            'answer_a' => $data[$i][2],
                            'answer_b' => $data[$i][3],
                            'answer_c' => $data[$i][4],
                            'correct_answer' => $data[$i][5],
                        ]);
                    } else {
                        // Log een fout als de rij niet genoeg kolommen heeft
                        Log::error('Row ' . ($i + 1) . ' in the CSV file does not have enough columns.');
                    }
                }
            } else {
                // Log een fout als het CSV-bestand leeg is
                Log::error('The CSV file is empty.');
            }
        }

        // Redirect naar de startpagina met een succesbericht
        return redirect('/')->with('success', 'CSV file uploaded and data inserted successfully');
    }

    // Methode voor het weergeven van de vragenpagina
    public function index()
    {
        // Haal alle vragen op uit de database
        $questions = Question::all();

        // Render de vragenpagina met de vragen als data
        return Inertia::render('Quiz/QuestionsComponent', [
            'questions' => $questions,
        ]);
    }
}
