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
        if ($request->has('search')) {
            return new TaskCollectionResponse(
                // Task of project where any attribute in the task is like the search
                Task::query()
                    ->with([
                        'assignedTo',
                        'taskCreatedBy',
                        'taskUpdatedBy',
                        'project'
                    ])
                    ->where('project_id', $project->id)
                    ->where(function ($query) use ($request) {
                        $query->where('name', 'like', '%' . $request['search'] . '%')
                            ->orWhere('description', 'like', '%' . $request['search'] . '%')
                            ->orWhere('start_date', 'like', '%' . $request['search'] . '%')
                            ->orWhere('due_date', 'like', '%' . $request['search'] . '%')
                            ->orWhere('end_date', 'like', '%' . $request['search'] . '%')
                            ->orWhere('status', 'like', '%' . $request['search'] . '%')
                            ->orWhere('folder', 'like', '%' . $request['search'] . '%')
                            ->orWhere('validated', 'like', '%' . $request['search'] . '%')
                            ->orWhere('receipt', 'like', '%' . $request['search'] . '%')
                            ->orWhere('cancelValidation', 'like', '%' . $request['search'] . '%')
                            ->orWhere('weighting', 'like', '%' . $request['search'] . '%')
                            ->orWhere('created_by', 'like', '%' . $request['search'] . '%')
                            ->orWhere('updated_by', 'like', '%' . $request['search'] . '%')
                            ->orWhere('project_id', 'like', '%' . $request['search'] . '%')
                            ->orWhere('assigned_to', 'like', '%' . $request['search'] . '%');
                    })
                    ->paginate(5)
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
                    ->where('project_id', $project->id)
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
                    ->where('project_id', $project->id)
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
        //Faire la somme des weighting des taches du projet
        $sum = Task::where('project_id', $request['project_id'])->sum('weighting');
        //Si la somme des weighting des taches du projet + le weighting de la tache à créer est supérieur à 100
        if ($sum + $request['weighting'] > 100) {
            return response(json_encode(['error' => 'The sum of the weighting of the tasks of the project is greater than 100']), 403);
        }
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
     * Validate task create by another person than Task manager
     */
    public function validation(Request $request, Task $task)
    {
        // if ($request->user()->id == $task->project->updated_by) {
        $request->merge(['validated' => !$task->validated]);
        $request->merge(['updated_by' => $request->user()->id]);
        $request['validated'] ? ($request->merge(['cancelValidation' => now()])) : ($request->merge(['cancelValidation' => null]));
        $request->merge(['status' => 'toDo']);

        $fields = $request->validate([
            'validated' => 'required|boolean',
            'updated_by' => 'required|exists:users,id',
            'cancelValidation' => 'nullable|date',
            'status' => 'required|in :toDo,doing,done,awaitingValidation',
        ]);

        $task->update($fields);

        return new TaskCollectionResponse(

            Task::query()
                ->with([
                    'assignedTo',
                    'taskCreatedBy',
                    'taskUpdatedBy',
                    'project'
                ])
                ->where('project_id', $task->project->id)
                ->paginate(5)
        );
        // } else {
        //     return response(json_encode(['error' => 'You are not assigned to this task']), 403);
        // }
    }
    /**
     * Validate task submit by collaborator
     */
    public function validated(Request $request, Task $task)
    {
        if ($request->user()->id = $task->updated_by) {
            $request->merge(['status' => ($task->status == 'done') ? 'doing' : 'done']);
            $request->merge(['updated_by' => $request->user()->id]);

            $fields = $request->validate([
                'status' => 'required|in :toDo,doing,done,awaitingValidation',
                'updated_by' => 'required|exists:users,id',
            ]);

            $task->update($fields);

            return response(json_encode($task), 200);
        }
        return response(json_encode(['error' => 'You are not assigned to this task']), 403);
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
        if ($task->folder != null) {
            Storage::delete($task->folder);
        }
        $task->delete();
        return response(json_encode($task), 200);
    }

    /**
     * Receipt task
     */
    public function receipt(Request $request, Task $task)
    {
        if ($request->user()->id === $task->assignedTo) {
            $request->merge(['receipt' => ($request['receipt'] == 'true')]);

            $fields = $request->validate([
                'receipt' => 'required|boolean',
            ]);

            Task::where('id', $task->id)->update($fields);
            $task->refresh();

            return response(json_encode($task), 200);
        } else {
            return response(json_encode(['error' => 'You are not assigned to this task']), 403);
        }
    }

    /**
     * Submit task
     */
    public function submit(Request $request, Task $task)
    {
        $fields = $request->validate([
            'folder' => 'required|mimes:zip,rar',
        ]);

        $path = Storage::putFile('taskRessource', $request->file('folder'));

        $task->update([
            'folder' => $path,
            'end_date' => now(),
            'status' => 'awaitingValidation',
        ]);
    }
}
