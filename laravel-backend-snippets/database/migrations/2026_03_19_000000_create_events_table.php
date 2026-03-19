<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->string('id')->primary();

            $table->string('place_id');
            $table->string('place_name');
            $table->enum('state', ['Gujarat', 'Rajasthan']);

            $table->string('name');
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->string('organizer')->nullable();

            $table->enum('recurrence', ['single', 'range', 'daily', 'weekly', 'weekend'])->default('single');
            $table->json('days_of_week')->nullable();

            $table->date('start_date');
            $table->date('end_date')->nullable();

            $table->boolean('is_festival')->default(false);
            $table->string('festival_key')->nullable();

            $table->timestamps();

            $table->index(['state', 'start_date']);
            $table->index(['place_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
