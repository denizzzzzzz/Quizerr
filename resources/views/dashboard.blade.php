@extends('layouts.app')

@section('content')
<div class="dashboard">
    <div class="dashboard-container">
    <div class="student-info-block">
            <div class="student-info">
            <h1>Jaap Daap</h1>
            <h1 clas="points">28/30</h1>
            </div>
            <div class="student-info">
            <h1>Erik Zweerik</h1>
            <h1>22/30</h1>
            </div>
            <div class="student-info">
            <h1>John Ko</h1>
            <h1>12/30</h1>
            </div>
            <div class="student-info">
            <h1>Soft Ware</h1>
            <h1>20/30</h1>
            </div>
            <div class="student-info">
            <h1>Lets Go</h1>
            <h1>30/30</h1>
            </div>
            <div class="student-info">
            <h1>Test Data</h1>
            <h1>18/30</h1>
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
        </div>
            </form>
        </div>
    </div>
</div>
@endsection