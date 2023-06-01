<?php

namespace App\Http\Controllers;

use App\Models\Absence;
use App\Models\Agent;
use App\Models\Contract;
use App\Responses\Agent\AgentCollectionResponse;
use Illuminate\Http\Request;

class AbsenceController extends Controller
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
        $agentId =Agent::where('person_id', $request->user()->person_id)->get('id')[0]["id"];
        $request->merge(['contract_id' => Contract::find($agentId)->get('id')[0]["id"]]);

        $fields = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'motif' => 'required|string',
            'contract_id' => 'required|exists:contracts,id',
        ]);
        $absence = Absence::create([
            'start_date' => $fields['start_date'],
            'end_date' => $fields['end_date'],
            'motif' => $fields['motif'],
            'contract_id' => $fields['contract_id'],
        ]);
        return response(json_encode($absence), 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Absence $absence)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Absence $absence)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Absence $absence)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Absence $absence)
    {
        //
    }
}
