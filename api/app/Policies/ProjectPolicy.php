<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return ($user->role === 'Administrator')
            ? Response::allow()
            : Response::deny('You are not allowed to view any projects.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Project $project): Response
    {
        return ($user->role === 'Task Manager' || $user->role === 'Administrator')
            ? Response::allow()
            : Response::deny('You are not allowed to view this project.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return ($user->role === 'Task Manager' || $user->role === 'Administrator')
            ? Response::allow()
            : Response::deny('You are not allowed to create a project.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Project $project): Response
    {
        return ($user->role === 'Task Manager' || $user->role === 'Administrator')
            ? Response::allow()
            : Response::deny('You are not allowed to update project.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Project $project): Response
    {
        return ($user->role === 'Task Manager' || $user->role === 'Administrator')
            ? Response::allow()
            : Response::deny('You are not allowed to delete a project.');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Project $project): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Project $project): bool
    {
        //
    }
}
