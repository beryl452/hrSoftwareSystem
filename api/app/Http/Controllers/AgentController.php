<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use Illuminate\Http\Request;
use App\Http\Resources\Agent\AgentCollection as AgentCollectionResponse;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        return new AgentCollectionResponse(
            Agent::query()
                ->with([
                    'person',
                    'contracts',
                ])
                ->where('person_id', $request->user()->person_id)
                ->get()
        );

    }

    public function allAgents(Request $request)
    {
        if ($request->has('search')) {
            return new AgentCollectionResponse(
                Agent::query()
                    ->with([
                        'person',
                        'contracts',
                    ])
                    ->where('code', 'like', '%' . $request->search . '%')
                    ->orWhereHas('person', function ($query) use ($request) {
                        $query->where('firstname', 'like', '%' . $request->search . '%')
                            ->orWhere('lastname', 'like', '%' . $request->search . '%')
                            ->orWhere('email', 'like', '%' . $request->search . '%')
                            ->orWhere('phone', 'like', '%' . $request->search . '%');
                    })
                    ->paginate(5)
            );
        } else {
            return new AgentCollectionResponse(
                Agent::query()
                    ->with([
                        'person',
                        'contracts',
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
        $fields = $request->validate([
            'person_id' => 'required|exists:people,id',
            'code' => 'required|string',
        ]);

        $agent = Agent::create([
            'person_id' => $fields["person_id"],
            'code' => $fields["code"],
        ]);

        return response(json_encode($agent), 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Agent $agent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Agent $agent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Agent $agent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agent $agent)
    {
        $agent->delete();
        return response(json_encode($agent), 200);
    }
}
