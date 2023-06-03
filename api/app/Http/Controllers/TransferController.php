<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Responses\Transfer\TransferCollectionResponse;
use Illuminate\Http\Request;

class TransferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new TransferCollectionResponse(
            Transfer::query()
                ->with([
                    'from',
                    'to',
                    'task',
                ])
                ->paginate(5)
        );
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
            $request->merge(['user_to' => Transfer::find((int)$request['task_id'])->task->assigned_to]);
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
            return new TransferCollectionResponse(
                Transfer::query()
                    ->with([
                        'from',
                        'to',
                        'task',
                    ])
                    ->where('id', $transfer->id)
                    ->get()
                    );
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
    public function approuve(Transfer $transfer)
    {
        if (!$transfer->approuve) {
            $transfer->task->update([
                'assigned_to' => $transfer->user_to,
            ]);
            $transfer->update([
                'approuve' => true,
            ]);
        } else {
            $transfer->task->update([
                'assigned_to' => $transfer->user_from,
            ]);
            $transfer->update([
                'approuve' => false,
            ]);
        }
        return new TransferCollectionResponse(
            Transfer::query()
                ->with([
                    'from',
                    'to',
                    'task',
                ])
                ->paginate(5)
        );
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transfer $transfer)
    {
        $transfer->delete();
        return new TransferCollectionResponse(
            Transfer::query()
                ->with([
                    'from',
                    'to',
                    'task',
                ])
                ->paginate(5)
        );    }
}
