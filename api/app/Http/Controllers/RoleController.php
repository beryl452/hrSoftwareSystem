<?php

namespace App\Http\Controllers;

use App\Models\Ressource;
use App\Models\Role;
use App\Responses\Role\RoleCollectionResponse;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new RoleCollectionResponse(
            Role::query()
                ->with([
                    'ressources',
                ])
                ->get()
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
        $fields = $request->validate([
            'name' => 'required|string|unique:roles,name',
            'description' => 'required|string',
        ]);

        $role = Role::create([
            'name' => $fields['name'],
            'description' => $fields['description'],
        ]);
        return response(json_encode($role), 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        return new RoleCollectionResponse(
            Role::query()
                ->with([
                    'ressources',
                ])
                ->where('id', $role->id)
                ->get()
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        //
    }

    public function deleteAbility(Role $role, Ressource $ressource)
    {
        $role->ressources()->detach($ressource->id);
        return response()->json([
            'message' => 'Ability deleted',
        ]);
    }

    public function addAbility(Request $request)
    {
        $role = Role::find($request->role_id);
        $role->ressources()->attach($request->ressource_id);
        return response()->json([
            'message' => 'Ability added',
        ]);
    }
}
