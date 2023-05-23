<?php

namespace App\Http\Controllers;

use App\DataTransferObjects\LoginHistory\LoginHistoryDataObject;
use App\Models\Role;
use App\Models\User;
use App\Responses\User\UserCollectionResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use App\Actions\LoginHistory\StoreLoginHistoryAction;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): UserCollectionResponse
    {
        return new UserCollectionResponse(
            User::query()
                ->with([
                    'person',
                ])
                ->paginate(1)
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
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
    public function login(Request $request)
    {

        $fields = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('username', $fields['username'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad credentials'
            ], 401);
        }
        $abilities = Role::find($user->role->id)->ressources()->get(['name'])->pluck('name')->toArray();
        // TOKEN expire in 1 day
        $token = $user->createToken(time(), $abilities ,now()->addDay())->plainTextToken;
        $loginHistoryDto = new LoginHistoryDataObject(
            date: now(),
            user_id: $user->id,
        );
        (new StoreLoginHistoryAction())
            ->handle(
                ...$loginHistoryDto->toArray()
            );
        return response(json_encode([
            'user' => $user,
            'token' => $token,
            'abilities' => $abilities,
        ]), 201);

    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response(json_encode([
            'message' => 'Logged out'
        ]), 201);
    }
}
