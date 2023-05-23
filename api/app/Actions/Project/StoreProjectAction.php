<?php

namespace App\Actions\Project;

use App\Models\Project;

class StoreProjectAction
{
    public function handle(
        $name,
        $description,
        $start_date,
        $end_date,
        $due_date,
        $status,
        $folder,
        $created_by,
        $updated_by,
    ) {
        Project::create([
            'name' => $name,
            'description' => $description,
            'start_date' => $start_date,
            'end_date' => $end_date,
            'due_date' => $due_date,
            'status' => $status,
            'folder' => $folder,
            'created_by' => $created_by,
            'updated_by' => $updated_by,
        ]);
    }
}
