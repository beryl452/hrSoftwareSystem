<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\File;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge(['status' => 'toDo']);
        $request->merge(['created_by' => $request->user()->id]);
        $request->merge(['updated_by' => $request->user()->id]);

        $fields = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'due_date' => 'required|date',
            'status' => 'required|in :toDo,doing,done,awaitingValidation',
            'folder' => 'required|mimes:zip,rar|max:10000',
            'created_by' => 'required|exists:users,id',
            'updated_by' => 'required|exists:users,id'
        ]);

        $path = Storage::putFile('projectRessource', $request->file('folder'));

        $project = Project::create([
            'name' => $fields['name'],
            'description' => $fields['description'],
            'start_date' => $fields['start_date'],
            'due_date' => $fields['due_date'],
            'status' => $fields['status'],
            'folder' => $path,
            'created_by' => $fields['created_by'],
            'updated_by' => $fields['updated_by'],
        ]);

        return response(json_encode($project), 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
