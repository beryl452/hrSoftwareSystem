<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Project::class);
        return response(json_encode(Project::paginate(5)), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $this->authorize('create', Project::class);
        $fields = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|in:to Do, Doing, Done',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'due_date' => 'nullable|date',
            'created_by' => 'required|integer|exists:users,id',
            'updated_by' => 'required|integer|exists:users,id',
            'file' => 'nullable|string',
        ]);

        $project = Project::create([
            'title' => $fields['title'],
            'description' => $fields['description'],
            'status' => $fields['status'],
            'start_date' => $fields['start_date'],
            'end_date' => $fields['end_date'],
            'due_date' => $fields['due_date'],
            'created_by' => $fields['created_by'],
            'updated_by' => $fields['updated_by'],
            'file' => $fields['file'],
        ]);

        return response(json_encode($project), 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
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
    public function update(UpdateProjectRequest $request, $id)
    {
        $projet = Project::find($id);

        $this->authorize('update', $projet);

        // Do validation if one input is defined

        if ($request->has('title')) {
            $fields = $request->validate([
                'title' => 'required|string',
            ]);
        }
        if ($request->has('description')) {
            $fields = $request->validate([
                'description' => 'required|string',
            ]);
        }
        if ($request->has('status')) {
            $fields = $request->validate([
                'status' => 'required|in:to Do, Doing, Done',
            ]);
        }
        if ($request->has('file')) {
            $fields = $request->validate([
                'file' => 'required|string',
            ]);
        }
        if ($request->has('start_date')) {
            $fields = $request->validate([
                'start_date' => 'required|date',
            ]);
        }
        if ($request->has('end_date')) {
            $fields = $request->validate([
                'end_date' => 'required|date',
            ]);
        }
        if ($request->has('due_date')) {
            $fields = $request->validate([
                'due_date' => 'required|date',
            ]);
        }
        if ($request->has('created_by')) {
            $fields = $request->validate([
                'created_by' => 'required|integer|exists:users,id',
            ]);
        }
        if ($request->has('updated_by')) {
            $fields = $request->validate([
                'updated_by' => 'required|integer|exists:users,id',
            ]);
        }

        $projet->update($request->all());

        return response(json_encode($projet), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $projet = Project::find($id);

        $this->authorize('delete', $projet);

        $projet->delete();

        return response(json_encode($projet), 200);
    }

    public function projectsBilan()
    {
        $toDo = Project::where('status', 'to Do')->count();
        $doing = Project::where('status', 'Doing')->count();
        $done = Project::where('status', 'Done')->count();

        return response(json_encode([
            'toDo' => $toDo,
            'Doing' => $doing,
            'Done' => $done,
        ]), 200);
    }

    public function search($search){
        file_put_contents("lidn.json","A");
        $file = fopen("lidn.txt","a");
        $this->authorize('viewAny', Project::class);
        $projects = Project::where('title', 'like', '%'.$search.'%')->paginate(5);
        file_put_contents("lidn.json",json_encode($projects));
        fclose($file);
        return response(json_encode($projects), 200);
    }
}
