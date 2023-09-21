<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionsController;
use App\Http\Controllers\ResultController;
use Illuminate\Support\Facades\Route;

// Route voor de welkomstpagina
Route::get('/', function () {
    return view('welcome');
});

// Route voor het weergeven van de quizpagina
Route::get('/quiz', [QuestionsController::class, 'index'])->name('quiz');

// Route voor het weergeven van de resultatenpagina
Route::get('/result', [ResultController::class, 'showResultPage'])->name('show.result.page');

// Route voor het weergeven van het dashboard (vereist authenticatie en verificatie)
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route voor het verwerken van het uploaden van een CSV-bestand
Route::post('/upload', [QuestionsController::class, 'upload']);

// Groep van routes die authenticatie vereisen
Route::middleware('auth')->group(function () {
    // Route voor het bewerken van het gebruikersprofiel
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    
    // Route voor het bijwerken van het gebruikersprofiel
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    
    // Route voor het verwijderen van het gebruikersprofiel
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Authenticatieroutes
require __DIR__.'/auth.php';
