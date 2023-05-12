<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\File;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $this->authorize('viewAny', Task::class);
        // return response(json_encode(Task::paginate(5)), 200);
        if (auth()->user()->role == 'admin') {
            return response(json_encode(Task::paginate(5)), 200);
        } else if (auth()->user()->role == 'Task Manager') {
            // Les tâches de son département
            return response(json_encode(Task::paginate(5)), 200);

            // return response(json_encode(Task::whereHas('createdBy', function ($query) {
            //     $query->where('department_id', auth()->user()->department_id);
            // })->paginate(5)));
        } else {
            // Les tâches qui lui sont assignées
            return response(json_encode(Task::where('assigned_to', auth()->user()->id)->paginate(5)));
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $this->authorize('create', Task::class);
        $request->merge(['end_date' => $request->due_date]);
        if (auth()->user()->role === 'Collaborator' || auth()->user()->role === 'Administrator') {
            $request->merge(['status' => 'Awaiting validation']);
        } else {
            $request->merge(['status' => 'to Do']);
        }
        $request->merge(['created_by' => $request->user()->id]);
        $request->merge(['updated_by' => $request->user()->id]);
        $request->merge(['assigned_to' => (int)$request["assigned_to"]]);
        $request->merge(['project_id' => (int)$request->project_id]);
        $request->merge(['ponderation' => (int)$request->ponderation]);

        // $request->merge(['project_id' => intval($request->project_id)]);
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
            // 'file' => 'nullable|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
            // 'assigned_to' => 'required|integer|exists:users,id',
            // 'project_id' => 'required|integer|exists:projects,id',
            // 'ponderation' => 'required|integer|min:1|max:100',
        ]);

        $task = Task::create([
            'title' => $fields['title'],
            'description' => $fields['description'],
            'status' => $request['status'],
            'start_date' => $fields['start_date'],
            'end_date' => $fields['end_date'],
            'due_date' => $fields['due_date'],
            'created_by' => $fields['created_by'],
            'updated_by' => $fields['updated_by'],
            'file' => $request['file_path'],
            'assigned_to' => $request['assigned_to'],
            'project_id' => $request['project_id'],
            'ponderation' => $request['ponderation'],
        ]);
        return response(json_encode($task), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        return response(json_encode($request->all()), 200);
        $this->authorize('update', $task);
        // $request->merge(['end_date' => $request->due_date]);
        $request->merge(['updated_by' => $request->user()->id]);
        $request->merge(['assigned_to' => (int)$request->input("assign_to")]);

        // $request->merge(['project_id' => intval($request->project_id)]);

        $uploadedFile = $request->file('file');

        if ($uploadedFile != null) {
            $filename = Str::uuid() . '.' . $uploadedFile->getClientOriginalExtension();
            $path = Storage::putFile('TasksFiles', new File($uploadedFile, $filename));
            $request->merge(['file_path' => $path]);
        }

        $fields = $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            // 'status' => 'nullable|in:to Do, Doing, Done',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'created_by' => 'nullable|integer|exists:users,id',
            'updated_by' => 'nullable|integer|exists:users,id',
            //'file' => 'nullable|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048'
        ]);

        $task->update([
            'title' => $fields['title'],
            'description' => $fields['description'],
            'status' => $request['status'],
            'start_date' => $fields['start_date'],
            'end_date' => $fields['end_date'],
            'due_date' => $fields['due_date'],
            'created_by' => $task->created_by,
            'updated_by' => $fields['updated_by'],
            'file' => $request['file_path'],
            'assigned_to' => $request['assigned_to'],
            'project_id' => $request['project_id']
        ]);
        return response(json_encode($task), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();
        return response(json_encode($task), 200);
    }

    public function download(Task $task)
    {
        // $this->authorize('download', $task);

        // return response(json_encode($task), 200);
        // $this->authorize('viewAny', $task);
        return Storage::download($task->file);
    }
}
