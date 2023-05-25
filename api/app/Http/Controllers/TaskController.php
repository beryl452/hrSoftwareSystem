<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
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
        $request->merge(['receipt' => ($request['receipt']=='true')]);
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
