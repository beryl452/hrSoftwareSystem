<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use Illuminate\Http\Request;

class TransferController extends Controller
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
        // return response(json_encode(
        // [$request->user()->id, Transfer::find($request['task_id'])->task->assigned_to]
        // ), 200);
        if ($request->user()->id == Transfer::find($request['task_id'])->task->assigned_to) {
            $request->merge(['user_from' => $request->user()->id]);
            $request->merge(['approuve' => false]);
            $fields = $request->validate([
                'reason' => 'required|string',
                'approuve' => 'required|boolean',
                'user_from' => 'required|exists:users,id',
                'user_to' => 'required|exists:users,id',
                'task_id' => 'required|exists:tasks,id',
            ]);

            $transfer = Transfer::create([
                'reason' => $fields['reason'],
                'approuve' => $fields['approuve'],
                'user_from' => $fields['user_from'],
                'user_to' => $fields['user_to'],
                'task_id' => $fields['task_id'],
                'user_from' => $fields['user_from']
            ]);
            return response(json_encode($transfer), 200);
        } else {
            return response(json_encode(['error' => 'You are not assigned to this task']), 403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }
    public function approuve(Request $request, Transfer $transfer)
    {
        // return response(json_encode($request->all()), 200);
        $request->merge(['approuve' => ($request['approuve'] == 'true')]);
        if ($request['approuve']) {
            $transfer->task->update([
                'assigned_to' => $transfer->user_to,
            ]);
        }
        $fields = $request->validate([
            'approuve' => 'required|boolean',
        ]);
        $transfer->update($fields);
        $this->destroy($transfer);

        if ($request['approuve']) {
            return response(json_encode(['message' => 'Transfer approuved']), 200);
        }
        return response(json_encode(['message' => 'Transfer rejected']), 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transfer $transfer)
    {
        $transfer->delete();
        return response(json_encode(['success' => 'Transfer deleted']), 200);
    }
}
