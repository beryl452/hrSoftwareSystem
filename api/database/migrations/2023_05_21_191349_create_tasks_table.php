<?php

use App\Models\User;
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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->dateTime('start_date');
            $table->dateTime('due_date');
            $table->dateTime('end_date')->nullable();
            $table->enum('status', ['toDo', 'doing', 'done', 'awaitingValidation']);
            $table->string('folder')->nullable();
            $table->boolean('receipt')->nullable();
            $table->dateTime('cancelValidation')->nullable();
            $table->integer('weighting')->nullable();
            $table->foreignId('assigned_to')->references('id')->on('users');
            $table->foreignId('created_by')->references('id')->on('users');
            $table->foreignId('updated_by')->references('id')->on('users');
            $table->foreignId('project_id')->references('id')->on('projects')->constrained()->cascadeOnDelete();;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
