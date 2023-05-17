<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\HistorySalaire;
use App\Models\Mois;
use App\Models\Task;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Date;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $this->authorize('viewAny', Task::class);
        // return response(json_encode(Task::paginate(5)), 200);
        // if (auth()->user()->role == "Administrator") {
        return response(json_encode(Task::paginate(5)), 200);
        // } else if (auth()->user()->role == 'Task Manager') {
        // Les tâches de son département
        return response(json_encode(Task::paginate(5)), 200);

        // return response(json_encode(Task::whereHas('createdBy', function ($query) {
        //     $query->where('department_id', auth()->user()->department_id);
        // })->paginate(5)));
        // } else {
        // Les tâches qui lui sont assignées
        return response(json_encode(Task::where('assigned_to', auth()->user()->id)->paginate(5)));
        // }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // $this->authorize('create', Task::class);
        $request->merge(['end_date' => $request->due_date]);
        if (auth()->user()->role === 'Collaborator' || auth()->user()->role === 'Administrator') {
            $request->merge(['status' => 'Awaiting validation']);
        } else {
            $request->merge(['status' => 'to Do']);
        }
        $request->merge(['created_by' => $request->user()->id]);
        $request->merge(['updated_by' => $request->user()->id]);
        $request->merge(['assigned_to' => (int)$request->input("assign_to")]);

        // $request->merge(['project_id' => intval($request->project_id)]);
        $uploadedFile = $request->file('file');

        if ($uploadedFile != null) {
            $filename = Str::uuid() . '.' . $uploadedFile->getClientOriginalExtension();
            $path = Storage::putFile('TasksFiles', new File($uploadedFile, $filename));
            $request->merge(['file_path' => $path]);
        }

        $fields = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            // 'status' => 'required|in:to Do, Doing, Done, Awaiting validation',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'due_date' => 'nullable|date',
            'created_by' => 'required|integer|exists:users,id',
            'updated_by' => 'required|integer|exists:users,id',
            'file' => 'nullable|mimes:pdf,doc,docx,jpg,jpeg,png,svg|max:2048'
        ]);

        $task = Task::create([
            'title' => $fields['title'],
            'description' => $fields['description'],
            'status' => $request['status'],
            'start_date' => $fields['start_date'],
            'end_date' => $fields['end_date'],
            'due_date' => $fields['due_date'],
            'created_by' => $fields['created_by'],
            'updated_by' => $fields['updated_by'],
            'file' => $request['file_path'],
            'assigned_to' => $request['assigned_to'],
            'project_id' => $request['project_id']
        ]);
        return response(json_encode($task), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        // return response(json_encode($request->all()), 200);
        // $this->authorize('update', $task);
        // $request->merge(['end_date' => $request->dend_date]);
        $request->merge(['updated_by' => $request->user()->id]);
        $request->merge(['assigned_to' => (int)$request->input("assign_to")]);

        // $request->merge(['project_id' => intval($request->project_id)]);

        $uploadedFile = $request->file('file');

        if ($uploadedFile != null) {
            $filename = Str::uuid() . '.' . $uploadedFile->getClientOriginalExtension();
            $path = Storage::putFile('TasksFiles', new File($uploadedFile, $filename));
            $request->merge(['file_path' => $path]);
        }

        $date1 = new DateTime($request['due_date']);
        $date2 = new DateTime($request['end_date']);
        $intvalDtaTime = $date1->diff($date2)->format("%I");

        // return response(json_encode(['intvalDtaTime' => $request['retard'],
//         'penalty' => $request['penalty'], "$request->status === 'Done'" => ($request->status === "Done"), "$task->status !== 'Done'" => ($task->status !== 'Done'),  "$request->end_date >  $request->due_date']" => ($request['end_date'] > $request['due_date']) ]), 200);

        if ($request->status === "Done" && $task->status !== 'Done' && $request['end_date'] > $request['due_date']) {
            $request->merge(['retard' => $intvalDtaTime]);

            $theMonth = $date2->format("F");
            $theYear = intval($date2->format("Y"));

            $percent = (float) Mois::Where('annee', $theYear)->where('mois', $theMonth)->get('PenaltyTaskPercent')[0]['PenaltyTaskPercent'];

            $request->merge(['penalty' => (int)($intvalDtaTime * (int)$percent)]);

            $historySalaire = User::where('id', '=',$task->assigned_to)->get('historySalaire_id')[0]['historySalaire_id'];
            $SalaireBrut = (int) HistorySalaire::where('id',$historySalaire)->where('Status', true)->get('MontantSalaireBrut')[0]['MontantSalaireBrut'];

            $montantTask = ($SalaireBrut * $percent)/100;

            $request->merge(['penalty' => $montantTask]);

            // return response(json_encode(['$montantTask' => ($SalaireBrut * $percent)/100 , "historySalaire" => $historySalaire]));

            // return response(json_encode(['PenaltyTaskPercent' => $percent, '$theMonth' => $theMonth, '$theYear' => $theYear]));

            //
        }

        //$request->merge(['end_date' => date_create_from_format('d/m/Y:H:i:s', $request['end_date'])]);
        //$request->merge(['due_date' => date_create_from_format('d/m/Y:H:i:s', $request['due_date'])]);

        $fields = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            // 'status' => 'required|in:to Do, Doing, Done',
            'end_date' => 'required|date',
            'due_date' => 'nullable|date',
            'updated_by' => 'required|integer|exists:users,id',
            // 'file' => 'nullable|mimes:pdf,doc,docx,jpg,jpeg,png,svg|max:2048'
        ]);

        $task->update($request->all());
        return response(json_encode($task), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();
        return response(json_encode($task), 200);
    }

    public function search($search)
    {
        $this->authorize('viewAny', Task::class);
        return response(json_encode(Task::Where('title', 'like', '%' . $search . '%')->orWhere('description', 'like', '%' . $search . '%')->paginate(5)), 200);
    }

    public function download(Task $task)
    {
        // $this->authorize('download', $task);

        // return response(json_encode($task), 200);
        // $this->authorize('viewAny', $task);
        return Storage::download($task->file);
    }

    public function tasksBilan()
    {
        $toDo = Task::where('status', 'to Do')->count();
        $doing = Task::where('status', 'Doing')->count();
        $done = Task::where('status', 'Done')->count();
        $awaiting = Task::where('status', 'Awaiting validation')->count();

        // SELECT tasks.* SUM(penalty), SUM(retard)
        // FROM tasks
        // WHERE start_date BETWEEN $dateDebut AND $dateFin
        // GROUP BY

        return response(json_encode([
            'toDo' => $toDo,
            'Doing' => $doing,
            'Done' => $done,
            'awaitingValidation' => $awaiting,
        ]), 200);
    }

    public function penalty(Request $request)
    {
        $request->merge(['assigned_to' => intval($request->assigned_to)]);

        // return response()->json($request->all());



        $tasks = Task::with('assignee')->whereBetween('start_date', [$request['dateDebut'], $request['dateFin']])
            ->where('assigned_to', (int)$request['assigned_to'])
            ->get();

        $sumP = 0;
        $sumR = 0;
        foreach ($tasks as $task) {
            $sumP += $task->penalty;
            $sumR += $task->retard;
        }

        return response()->json([$tasks, $sumP, $sumR]);
    }
}
