<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionsController;
use App\Http\Controllers\ResultController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/quiz', [QuestionsController::class, 'index'])->name('quiz');

Route::post('/result', [ResultController::class, 'index'])->name('result');
Route::get('/result', [ResultController::class, 'showResultPage'])->name('show.result.page');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/upload', [QuestionsController::class, 'upload']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
