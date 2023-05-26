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
use App\Models\Agent;
use App\Models\Department;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): UserCollectionResponse
    {
        if($request->has('search')){
            return new UserCollectionResponse(
                    User::query()
                        ->with([
                            'person',
                        ])
                    ->where('username', 'like', '%' . $request->search . '%')
                    ->orWhere('password', 'like', '%' . $request->search . '%')
                    ->paginate(5)
            );
        }
        else {
            return new UserCollectionResponse(
                User::query()
                    ->with([
                        'person',
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
        if (! $request->has('username') || ! $request->has('password') || ! $request->has('person_id') || ! $request->has('role_id')) {
            return response()->json([
                'message' => 'Missing required fields',
            ], 400);
        }
            $fields = $request->validate([
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string',
            'person_id' => 'required|integer|unique:users,person_id|exists:people,id',
            'role_id' => 'required|integer|exists:roles,id',
        ]);

        $user = User::create([
            'username' => $fields["username"],
            'password' => Hash::make($fields["password"]),
            'person_id' => $fields["person_id"],
            'role_id' => $fields["role_id"],
        ]);
        return response(json_encode($user), 200);
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
        $token = $user->createToken(time(), $abilities, now()->addDay())->plainTextToken;
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

    public function collaborators(Request $request)
    {
        if ($request->user()->role->name === 'Administrator') {
            return new UserCollectionResponse(
                User::query()
                    ->with([
                        'person',
                    ])
                    ->where('role_id', 1)
                    ->get()
            );
        }
        else
        // ($request->user()->role->name === 'collaborator')
        {

        $department_id = (Agent::query()
            ->with([
                'contracts' => function ($query) {
                    $query->where('status', true);
                }
            ])
            ->where('person_id', $request->user()->person_id)
            ->first()
            ->contracts
            ->pluck('department_id')[0]
        );

        return new UserCollectionResponse(
            User::query()
            ->with([
                'person' => function ($query) {
                    $query->with([
                        'agent' => function ($query) {
                            $query->with([
                                'contracts' => function ($query) {
                                    $query
                                    ->with([
                                        'department',
                                    ])
                                    ->where('status', true);

                                }
                            ]);
                        }
                    ]);
                }
            ])
            ->whereHas('person.agent.contracts', function ($query) use ($department_id) {
                $query->where('department_id', $department_id);
            })
            ->where('role_id', 1)
            ->get()

        );
    }
    }
}
