<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;

class TaskService
{
    /**
     * Get all tasks with their category eager loaded.
     * Prevents the N+1 query problem.
     */
    public function getAllTasks(): Collection
    {
        return Task::with('category')->get();
    }

    /**
     * Create a new task.
     */
    public function createTask(array $data): Task
    {
        return Task::create($data);
    }

    /**
     * Find a single task with its category eager loaded.
     */
    public function findTask(int $id): ?Task
    {
        return Task::with('category')->find($id);
    }

    /**
     * Update an existing task.
     */
    public function updateTask(Task $task, array $data): Task
    {
        $task->update($data);

        return $task->fresh('category');
    }

    /**
     * Delete a task.
     */
    public function deleteTask(Task $task): void
    {
        $task->delete();
    }
}
