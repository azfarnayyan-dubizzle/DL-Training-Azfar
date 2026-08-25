<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Laravel's Service Container automatically resolves and injects
     * TaskService here — no manual "new TaskService()" needed.
     */
    public function __construct(protected TaskService $taskService)
    {
    }

    /**
     * GET /api/tasks
     * Uses eager loading under the hood (Task::with('category')->get())
     * so fetching 100 tasks only runs 2 queries, not 101.
     */
    public function index(): JsonResponse
    {
        $tasks = $this->taskService->getAllTasks();

        return response()->json($tasks);
    }

    /**
     * POST /api/tasks
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $task = $this->taskService->createTask($validated);

        return response()->json($task, 201);
    }

    /**
     * GET /api/tasks/{task}
     */
    public function show(Task $task): JsonResponse
    {
        return response()->json($this->taskService->findTask($task->id));
    }

    /**
     * PUT /api/tasks/{task}
     */
    public function update(Request $request, Task $task): JsonResponse
    {
        $validated = $request->validate([
            'title'        => 'sometimes|string|max:255',
            'description'  => 'nullable|string',
            'is_completed' => 'sometimes|boolean',
            'category_id'  => 'sometimes|exists:categories,id',
        ]);

        $task = $this->taskService->updateTask($task, $validated);

        return response()->json($task);
    }

    /**
     * DELETE /api/tasks/{task}
     */
    public function destroy(Task $task): JsonResponse
    {
        $this->taskService->deleteTask($task);

        return response()->json(null, 204);
    }
}
