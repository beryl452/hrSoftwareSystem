<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Responses\Department\DepartmentCollectionResponse;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new DepartmentCollectionResponse(
            Department::all()
        );
    }
    public function allDepartments(Request $request){
        if($request->has('search')){
            return new DepartmentCollectionResponse(
                Department::query()
                    ->where('code', 'like', '%' . $request->search . '%')
                    ->orWhere('libelle', 'like', '%' . $request->search . '%')
                    ->paginate(5)
            );
        }else{
            return new DepartmentCollectionResponse(
                Department::query()
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
        $request->merge(['status' => true]);
        $fields = $request->validate([
            'code' => 'required|string|unique:departments,code',
            'libelle' => 'required|string',
        ]);
        $department = Department::create([
            'code' => $fields['code'],
            'libelle' => $fields['libelle'],
        ]);
        return response(json_encode($department), 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        $fields = $request->validate(
            [
                'code' => 'required|string|unique:departments,code',
                'libelle' => 'required|string',
            ]);
        $department->update([
            'code' => $fields['code'],
            'libelle' => $fields['libelle'],
        ]);
        return response(json_encode($department), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();
        return response(json_encode($department), 200);
    }
}
