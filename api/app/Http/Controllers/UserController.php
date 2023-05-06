<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', User::class);
        return response(json_encode(User::paginate(5)), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function register(Request $request)
    {
        $this->authorize('create', User::class);
        $fields = $request->validate([
            'username' => 'required|string|unique:users,username',
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'function' => 'required|string',
            'role' => 'required|in:Task Manager,Administrator,Collaborator, Payroll Manager',
            'password' => 'required|string',
            'password_confirmation' => 'required|same:password',
            'department_id' => 'required|integer|exists:users,id',
            "Birth" => "required|date",
        ]);

        $user = User::create([
            'username' => $fields['username'],
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
            'email' => $fields['email'],
            'function' => $fields['function'],
            'password' => bcrypt($fields['password']),
            'department_id' => $fields['department_id'],
            'role' => $fields['role'],
            'Birth' => $fields['Birth'],
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response(json_encode([
            'user' => $user,
            'token' => $token
        ]), 201);
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
        $this->authorize('view', $user);
        return response(json_encode($user), 200);
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
        $this->authorize('update', $user);
        if($request->has('username') && $request->username != $user->username) {
            $fields = $request->validate([
                // 'username' => 'required|string|unique:users,username',
            ]);
        }

        if($request->has('email') && $request->email != $user->email) {
            $fields = $request->validate([
                // 'email' => 'required|email|unique:users,email',
            ]);
        }

        if($request->has('password')) {
            $fields = $request->validate([
                'password' => 'required|string',
                // 'password_confirmation' => 'required|same:password',
            ]);
        }

        if($request->has('department_id') && $request->department_id != $user->department_id) {
            $fields = $request->validate([
                'department_id' => 'required|integer|exists:users,id',
            ]);
        }

        if($request->has('role') && $request->role != $user->role) {
            $fields = $request->validate([
                'role' => 'required|in:Task Manager,Administrator,Collaborator, Payroll Manager',
            ]);
        }

        if($request->has('Birth') && $request->Birth != $user->Birth) {
            $fields = $request->validate([
                'Birth' => 'required|date',
            ]);
        }

        if($request->has('firstname') && $request->firstname != $user->firstname) {
            $fields = $request->validate([
                'firstname' => 'required|string',
            ]);
        }

        if($request->has('lastname') && $request->lastname != $user->lastname) {
            $fields = $request->validate([
                'lastname' => 'required|string',
            ]);
        }

        if($request->has('function') && $request->function != $user->function) {
            $fields = $request->validate([
                'function' => 'required|string',
            ]);
        }


        $user->update($fields);

        return response(json_encode([
            'user' => $user,
        ]), 201);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

            $this->authorize('delete', $user);

            $user->delete();

            return response(json_encode($user), 200);
    }

    public function login(Request $request) {

        // Validate the user with username or email and password
        $fields = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Check username
        $user = User::where('username', $fields['username'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad credentials'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response(json_encode([
            'user' => $user,
            'token' => $token
        ]), 201);

    }
    public function usersBilan()
    {
        $numberadmin = User::where('role', 'Administrator')->count();
        $numbertaskmanager = User::where('role', 'Task Manager')->count();
        $numbercollaborator = User::where('role', 'Collaborator')->count();
        $numberpayrollmanager = User::where('role', 'Payroll Manager')->count();

        return response(json_encode([
            'Administrator' => $numberadmin,
            'TaskManager' => $numbertaskmanager,
            'Collaborator' => $numbercollaborator,
            'PayrollManager' => $numberpayrollmanager,
        ]), 200);
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }

    // GET|HEAD        api/users/{search} ............................................... UserController@search
    public function search($search)
    {
        $this->authorize('viewAny', User::class);
        return response(json_encode(User::where('username', 'like', '%' . $search . '%')->orWhere('firstname', 'like', '%' . $search . '%')->orWhere('lastname', 'like', '%' . $search . '%')->orWhere('email', 'like', '%' . $search . '%')->orWhere('function', 'like', '%' . $search . '%')->orWhere('role', 'like', '%' . $search . '%')->orWhere('Birth', 'like', '%' . $search . '%')->paginate(5)), 200);
    }
}
