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
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('libelle');
            //[FR:] Pourcentage à prélever par minute de retard
            //[EN:] Percentage to be deducted per minute of delay
            $table->float('PercentPerMinuteOfDelayPresence');
            $table->float('PercentPerDayOfDelayTask');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
