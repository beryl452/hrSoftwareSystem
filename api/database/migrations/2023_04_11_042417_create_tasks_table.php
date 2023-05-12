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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->enum('status', ['to Do', 'Doing', 'Done', 'Awaiting validation']);
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->dateTime('due_date')->nullable();
            $table->foreignId('created_by')->references('id')->on('users');
            $table->foreignId('updated_by')->references('id')->on('users');
            $table->foreignId('assigned_to')->references('id')->on('users');
            $table->string('file');
            $table->integer('ponderation');
            $table->boolean('acknowledgement')->default(false);
            $table->dateTime('acknowledgement_date')->nullable();
            $table->dateTime('cancelValidation')->nullable();
            $table->dateTime('validation')->nullable();
            $table->foreignId('project_id')->references('id')->on('projects');
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
