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
        Schema::create('transfers', function (Blueprint $table) {
            $table->string('transferReason');
            $table->boolean('approved')->default(false);
            $table->dateTime('approvedDate')->nullable();
            $table->foreignId('transferedBy')->references('id')->on('users');
            $table->foreignId('transferedTo')->references('id')->on('users');
            $table->foreignId('task_id')->references('id')->on('tasks');
            // $table->id();
            $table->primary(['transferedBy', 'transferedTo', 'task_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfers');
    }
};
