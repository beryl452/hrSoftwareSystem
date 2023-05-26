<?php

use App\Models\Agent;
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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->integer('baseSalary');
            $table->foreignId('agent_id')->references('id')->on('agents')->constrained()->cascadeOnDelete();
            $table->date('start_date');
            $table->date('end_date');
            $table->foreignId('department_id')->references('id')->on('departments')->constrained()->cascadeOnDelete();
            $table->string('function');
            $table->unique(['agent_id', 'department_id']);
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
