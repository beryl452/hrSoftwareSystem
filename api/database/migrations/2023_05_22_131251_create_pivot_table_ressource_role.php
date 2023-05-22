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
        Schema::create('ressource_role', function (Blueprint $table) {
            $table->foreignId('ressource_id')->references('id')->on('ressources')->cascadeOnDelete();
            $table->foreignId('role_id')->references('id')->on('roles')->cascadeOnDelete();
            $table->primary(['ressource_id', 'role_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ressource_role');
    }
};
