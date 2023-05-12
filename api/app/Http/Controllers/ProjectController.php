<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
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
        // $this->authorize('viewAny', Project::class);
        if (auth()->user()->role == 'admin') {
            return response(json_encode(Project::paginate(5)), 200);
        } else {
            // In SQL
            // SELECT projects.*
            // FROM projects, users
            // WHERE projects.created_by = users.id
            // AND users.department_id = auth()->user()->department_id
            // With Eloquent
            return response(json_encode($projects = Project::whereHas('createdBy', function ($query) {
                $query->where('department_id', auth()->user()->department_id);
            })->paginate(5)));
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $this->authorize('create', Project::class);

        $request->merge(['end_date' => $request->due_date]);
        if (auth()->user()->role === 'Collaborator' || auth()->user()->role === 'Administrator') {
            $request->merge(['status' => 'Awaiting validation']);
        } else {
            $request->merge(['status' => 'to Do']);
        }
        $request->merge(['created_by' => $request->user()->id]);
        $request->merge(['updated_by' => $request->user()->id]);

        $uploadedFile = $request->file('file');

        if ($uploadedFile != null) {
            $filename = Str::uuid() . '.' . $uploadedFile->getClientOriginalExtension();
            $path = Storage::putFile('ProjectsFiles', new File($uploadedFile, $filename));
            $request->merge(['file_path' => $path]);
        }

        $fields = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            // 'status' => 'required|in:to Do, Doing, Done, Awaiting validation',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'due_date' => 'nullable|date',
            'created_by' => 'required|integer|exists:users,id',
            'updated_by' => 'required|integer|exists:users,id',
            // 'file' => 'nullable|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048'
        ]);

        $project = Project::create([
            'title' => $fields['title'],
            'description' => $fields['description'],
            'status' => $request['status'],
            'start_date' => $fields['start_date'],
            'end_date' => $fields['end_date'],
            'due_date' => $fields['due_date'],
            'created_by' => $fields['created_by'],
            'updated_by' => $fields['updated_by'],
            'file' => $request['file_path'],
        ]);
        return response(json_encode($project), 200);
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
        // return response(json_encode(auth()->user()), 200);
        // $this->authorize('view', $project);
        if (auth()->user()->role == 'Administrator') {
            $tasks = Task::where('project_id', $project->id)->paginate(5);
        } else if (auth()->user()->role == 'Task Manager') {
            $tasks = Task::whereHas('project', function ($query) {
                $query->whereHas('updatedBy', function ($query) {
                    $query->where('department_id', auth()->user()->department_id);
                });
            })->where('project_id', $project->id)->paginate(5);
        } else {
            // Les tâches qui lui sont assignées
            $tasks = Task::where('project_id', $project->id)->where('assigned_to', auth()->user()->id)->paginate(5);
        }
        return response(json_encode([
            'project' => $project,
            'tasks' => $tasks
        ]), 200);
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
        $this->authorize('update', $project);

        $request->merge(['created_by' => $request->user()->id]);
        $request->merge(['updated_by' => $request->user()->id]);

         $uploadedFile = $request->file('file');

         if ($uploadedFile != null) {
             $filename = Str::uuid() . '.' . $uploadedFile->getClientOriginalExtension();
             $path = Storage::putFile('ProjectsFiles', new File($uploadedFile, $filename));
             $request->merge(['file_path' => $path]);
         }

         $request->merge(['file' => $request['file_path']]);
        //  return response(json_encode([$request['file'], $request['file_path']]), 200);
        $fields = $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            // 'status' => 'nullable|in:to Do, Doing, Done',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'created_by' => 'nullable|integer|exists:users,id',
            'updated_by' => 'nullable|integer|exists:users,id',
            // 'file' => 'nullable|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048'
        ]);

        $project->update(
            [
                'title' => $fields['title'],
                'description' => $fields['description'],
                'status' => $request['status'],
                'start_date' => $fields['start_date'],
                'end_date' => $fields['end_date'],
                'due_date' => $fields['due_date'],
                'created_by' => $fields['created_by'],
                'updated_by' => $fields['updated_by'],
                'file' => $request['file_path'],
            ]
        );

        return response(json_encode($project), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);

        $project->delete();

        return response(json_encode($project), 200);
    }

    public function projectsBilan()
    {
        $toDo = Project::where('status', 'to Do')->count();
        $doing = Project::where('status', 'Doing')->count();
        $done = Project::where('status', 'Done')->count();
        $awaiting = Project::where('status', 'Awaiting validation')->count();

        return response(json_encode([
            'toDo' => $toDo,
            'Doing' => $doing,
            'Done' => $done,
            'awaitingValidation' => $awaiting,
        ]), 200);
    }

    public function search($search)
    {
        $this->authorize('viewAny', Project::class);
        return response(json_encode(Project::Where('title', 'like', '%' . $search . '%')->orWhere('description', 'like', '%' . $search . '%')->paginate(5)), 200);
    }

    public function download(Project $project)
    {
        // return response(json_encode($project), 200);
        // $this->authorize('viewAny', $project);
        return Storage::download($project->file);
    }
}
