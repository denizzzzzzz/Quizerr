<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('open_questions', function (Blueprint $table) {
            $table->id();
            $table->string("question_id");
            $table->string("question");
            $table->string("correct_answer");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('open_questions');
    }
};
