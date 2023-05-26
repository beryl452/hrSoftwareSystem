<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\File;
use App\Responses\Project\ProjectCollectionResponse;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if($request->has('search')){
            return new ProjectCollectionResponse(
                Project::query()
                    ->with([
                        'projectCreatedBy',
                        'projectUpdatedBy',
                    ])
                    ->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%')
                    ->orWhere('status', 'like', '%' . $request->search . '%')
                    ->orWhere('start_date', 'like', '%' . $request->search . '%')
                    ->orWhere('due_date', 'like', '%' . $request->search . '%')
                    ->orWhere('end_date', 'like', '%' . $request->search . '%')
                    ->orWhere('validated', 'like', '%' . $request->search . '%')
                    ->orWhere('created_by', 'like', '%' . $request->search . '%')
                    ->orWhere('updated_by', 'like', '%' . $request->search . '%')
                    ->paginate(5)
            );
            return response(json_encode($request->search), 200);
        }
        if($request->user()->role->name === 'Administrator'){
            return new ProjectCollectionResponse(
                Project::query()
                    ->with([
                        'projectCreatedBy',
                        'projectUpdatedBy',
                    ])
                    ->paginate(5)
            );
        } else {
            return new ProjectCollectionResponse(
                Project::query()
                    ->with([
                        'projectCreatedBy',
                        'projectUpdatedBy',
                    ])
                    ->where('updated_by', $request->user()->id)
                    ->paginate(5)
            );
        }
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
            'folder' => 'required|mimes:zip,rar',
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
        Storage::delete($project->folder);
        $project->delete();
        return response(json_encode($project), 200);
    }

    public function changeStatus(Request $request, Project $project)
    {
        $request->merge(['updated_by' => $request->user()->id]);

        $fields = $request->validate([
            'status' => 'required|in :toDo,doing,done,awaitingValidation',
            'updated_by' => 'required|exists:users,id'
        ]);

        $project->update([
            'status' => $fields['status'],
            'updated_by' => $fields['updated_by'],
        ]);

        return response(json_encode($project), 200);
    }

    public function validation(Request $request, Project $project)
    {
        $request->merge(['updated_by' => $request->user()->id]);

        $fields = $request->validate([
            'validated' => 'required|boolean',
            'updated_by' => 'required|exists:users,id'
        ]);

        $project->update([
            'validated' => $fields['validated'],
            'updated_by' => $fields['updated_by'],
        ]);

        return response(json_encode($project), 200);
    }

    public function closeProject(Request $request, Project $project)
    {
        $request->merge(['updated_by' => $request->user()->id]);
        $request->merge(['status' => 'done']);
        $request->merge(['end_date' => now()]);

        $fields = $request->validate([
            'status' => 'required|in :toDo,doing,done,awaitingValidation',
            'updated_by' => 'required|exists:users,id',
            'end_date' => 'required|date'
        ]);

        $project->update([
            'status' => $fields['status'],
            'updated_by' => $fields['updated_by'],
            'end_date' => $fields['end_date'],
        ]);

        return response(json_encode($project), 200);
    }


}
