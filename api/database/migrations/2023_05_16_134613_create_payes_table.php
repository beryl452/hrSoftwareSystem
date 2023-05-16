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
        Schema::create('payes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('mois_id')->references('id')->on('mois')->onDelete('cascade');
            $table->foreignId('historySalaire_id')->references('id')->on('history_salaires')->onDelete('cascade');
            $table->foreignId('prime_id')->references('id')->on('primes')->onDelete('cascade');
            $table->foreignId('configuration_id')->references('id')->on('configurations')->onDelete('cascade');
            $table->unique(['user_id', 'mois_id']);
            $table->integer('salaire');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payes');
    }
};
