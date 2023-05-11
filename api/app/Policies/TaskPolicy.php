<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return ($user->role === 'Administrator' || $user->role === 'Task Manager' || $user->role ===  'Collaborator')
            ? Response::allow()
            : Response::deny('You are not allowed to view projects.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Task $task): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return ($user->role === 'Administrator' || $user->role === 'Task Manager' || $user->role ===  'Collaborator')
            ? Response::allow()
            : Response::deny('You are not allowed to create task');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Task $task): Response
    {
        return ($user->role === 'Administrator' || $user->role === 'Task Manager' || $task->created_by === $user->id || $task->assigned_to === $user->id)
            ? Response::allow()
            : Response::deny('You are not allowed to update task');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task): Response
    {
        return ($user->role === 'Administrator' || $user->role === 'Task Manager' || $task->created_by === $user->id)
            ? Response::allow()
            : Response::deny('You are not allowed to delete task');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Task $task): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Task $task): bool
    {
        //
    }

}
