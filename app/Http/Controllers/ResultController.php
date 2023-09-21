<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ResultController extends Controller
{
    // This method shows the result page
    public function showResultPage()
    {
        // Retrieve the totalTrueValuesMinusOne from the session
        $totalTrueValuesMinusOne = session('totalTrueValuesMinusOne');

        // Pass the data to your Blade view
        return view('result', ['totalTrueValuesMinusOne' => $totalTrueValuesMinusOne]);
    }
}
