<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Responses\Project\ProjectCollectionResponse;
use App\Responses\Task\TaskCollectionResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Project $project, Request $request)
    {
        // return response(json_encode($request->user()->role->name));
        if ($request->has('search')) {
            return new TaskCollectionResponse(
                Task::query()
                    ->with([
                        'assignedTo',
                        'taskCreatedBy',
                        'taskUpdatedBy',
                        'project'
                    ])
                    ->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%')
                    ->orWhere('status', 'like', '%' . $request->search . '%')
                    ->orWhere('weighting', 'like', '%' . $request->search . '%')
                    ->orWhere('start_date', 'like', '%' . $request->search . '%')
                    ->orWhere('due_date', 'like', '%' . $request->search . '%')
                    ->orWhere('end_date', 'like', '%' . $request->search . '%')
                    ->orWhere('receipt', 'like', '%' . $request->search . '%')
                    ->orWhere('cancelValidation', 'like', '%' . $request->search . '%')
                    ->orWhere('validated', 'like', '%' . $request->search . '%')
                    ->orWhere('folder', 'like', '%' . $request->search . '%')
                    ->get()
            );
        } else if ($request->user()->role->name === 'Administrator') {
            return new TaskCollectionResponse(

                Task::query()
                    ->with([
                        'assignedTo',
                        'taskCreatedBy',
                        'taskUpdatedBy',
                        'project'
                    ])
                    ->paginate(5)
            );
        } else if ($request->user()->role->name === 'Task manager') {
            return new TaskCollectionResponse(
                Task::query()
                    ->with([
                        'assignedTo',
                        'taskCreatedBy',
                        'taskUpdatedBy',
                        'project'
                    ])
                    ->where('updated_by', $request->user()->id)
                ->paginate(5)
            );
        } else {
            return new TaskCollectionResponse(
                Task::query()
                    ->with([
                        'assignedTo',
                        'taskCreatedBy',
                        'taskUpdatedBy',
                        'project'
                    ])
                    ->where('project_id', $project->id)
                    ->orWhere('assigned_to', $request->user()->id)
                    ->get()
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
        if (auth()->user()->role === 'Collaborator' || auth()->user()->role === 'Administrator') {
            $request->merge(['status' => 'awaitingValidation']);
        } else {
            $request->merge(['status' => 'toDo']);
        }
        $request->merge(['created_by' => $request->user()->id]);
        $request->merge(['updated_by' => $request->user()->id]);

        $fields = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'due_date' => 'required|date',
            'weighting' => 'required|integer|min:0|max:100',
            'status' => 'required|in :toDo,doing,done,awaitingValidation',
            'created_by' => 'required|exists:users,id',
            'updated_by' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'required|exists:users,id',
        ]);

        $task = Task::create($fields);

        return response(json_encode($task), 200);
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }

    public function receipt(Request $request, Task $task)
    {
        $request->merge(['receipt' => ($request['receipt'] == 'true')]);
        $request->merge(['updated_by' => $request->user()->id]);

        $fields = $request->validate([
            'receipt' => 'required|boolean',
            'updated_by' => 'required|exists:users,id',
        ]);

        Task::where('id', $task->id)->update($fields);
        $task->refresh();

        return response(json_encode($task), 200);
    }
}
