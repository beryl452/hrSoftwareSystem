<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use App\Http\Resources\Contract\ContractCollection as ContractCollectionResponse;
use App\Models\Agent;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Agent $agent)
    {
        return new ContractCollectionResponse(
            Contract::query()
                ->with([
                    'agent',
                    'department',
                ])
                ->where('agent_id', $agent->id)
                ->paginate(5)
        );
    }


    public function allContracts(Request $request)
    {
        if ($request->has('search')) {
            return new ContractCollectionResponse(
                Contract::query()
                    ->with([
                        'agent',
                        'department',
                        'agent',
                    ])
                    ->where('code', 'like', '%' . $request->search . '%')
                    ->orWhereHas('contract', function ($query) use ($request) {
                        $query->where('baseSalary', 'like', '%' . $request->search . '%')
                            ->orWhere('start_date', 'like', '%' . $request->search . '%')
                            ->orWhere('end_date', 'like', '%' . $request->search . '%')
                            ->orWhere('function', 'like', '%' . $request->search . '%')
                            ->orWhere('status', 'like', '%' . $request->search . '%');
                    })
                    ->paginate(5)
            );
        } else {
            return new ContractCollectionResponse(
                Contract::query()
                    ->with([
                        'agent',
                        'department',
                        'agent',
                    ])
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
        $request->merge(['status' => true]);
        $fields = $request->validate([
            'agent_id' => 'required|exists:agents,id',
            'department_id' => 'required|exists:departments,id',
            'baseSalary' => 'required| integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'function' => 'required|string',
            'status' => 'required|boolean',
        ]);
        $contract = Contract::create([
            'agent_id' => $fields['agent_id'],
            'department_id' => $fields['department_id'],
            'baseSalary' => $fields['baseSalary'],
            'start_date' => $fields['start_date'],
            'end_date' => $fields['end_date'],
            'function' => $fields['function'],
            'status' => $fields['status'],
        ]);
        return response(json_encode($contract), 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contract $contract)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contract $contract)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contract $contract)
    {
        $fields = $request->validate([
            'agent_id' => 'required',
            'department_id' => 'required',
            'code' => 'required',
            'baseSalary' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'function' => 'required',
            'status' => 'required',
        ]);
        $contract->update([
            'agent_id' => $fields['agent_id'],
            'department_id' => $fields['department_id'],
            'code' => $fields['code'],
            'baseSalary' => $fields['baseSalary'],
            'start_date' => $fields['start_date'],
            'end_date' => $fields['end_date'],
            'function' => $fields['function'],
            'status' => $fields['status'],
        ]);
        return response(json_encode($contract), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contract $contract)
    {
        $contract->delete();
        return response(json_encode($contract), 200);
    }
}
