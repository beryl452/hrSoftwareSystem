<?php

namespace App\Http\Controllers;

use App\Models\Ressource;
use App\Responses\Ressource\RessourceCollectionResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class RessourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new RessourceCollectionResponse(
            Ressource::query()
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Ressource $ressource)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ressource $ressource)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ressource $ressource)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ressource $ressource)
    {
        //
    }
    public function createAbilities()
    {
        $routes = Route::getRoutes();

        foreach ($routes as $route) {
            $ressource = new Ressource([
              'name' =>  $route->getName() .PHP_EOL,
              'uri' => $route->uri,
              'method' => implode('|', $route->methods)
            ]);
            $ressource->save();
        }

        return response()->json([
            'message' => 'Abilities created successfully',
        ]);
    }
}
