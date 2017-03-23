<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;

use App\Models\Module;
use App\Models\Task;

class ModuleController extends Controller
{
    public function get($moduleId = 0){
    	if($moduleId == 0){
			return response()->json([
				'modules' => Module::all()
			], 200);
		}

		return response()->json([
			'module' => Module::find($moduleId)
		], 200);
    }

    public function delete($moduleId){
    	$module = Module::find($moduleId);
    	$module->forceDelete();
    	return response()->json([
    		'module' => $module
    	], 200);
    }

    public function tasks($moduleId){
    	return response()->json([
			'tasks' => Module::find($moduleId)->tasks
		], 200);
    }

    public function newModule(Request $request){
    	
    	try{

    	$module = new Module;
        $module->title = $request->title;
        $module->description = $request->description;
        $module->start_date = date('Y-m-d', strtotime($request->start_date));
        $module->end_date = date('Y-m-d', strtotime($request->end_date));
        $module->project_id = $request->project_id;
        $module->save();

         return response()->json([
            'module' => $module
        ],200);
         }catch(Exception $e){
    		return response()->json([
	            'error' => $e->getMessage()
	        ],200);
    	}
    }

    public function edit($moduleId, Request $request){
        $module = Module::find($moduleId);

        $module->title = $request->title;
        $module->description = $request->description;
        $module->status = $request->status;
        $module->depends_on = $request->depends_on;
        $module->start_date = date('Y-m-d', strtotime($request->start_date));
        $module->end_date = date('Y-m-d', strtotime($request->end_date));

        $module->save();

        return response()->json([
            'module' => $module
        ], 200);
    }

    public function gantt($moduleId){
        $tasks = DB::table('module_gantt')->where('module_id', $moduleId)->get();
        return response()->json([
            'tasks' => $tasks
        ], 200);
    }

    public function progress($moduleId){
    
        $data = array();

        $data['Not Started'] = Task::where('module_id', $moduleId)
                                ->where('status', 'Not Started')->count();
        $data['Under Development'] = Task::where('module_id', $moduleId)
                                ->where('status', 'Under Development')->count();
        $data['Ready For Testing'] = Task::where('module_id', $moduleId)
                                ->where('status', 'Ready For Testing')->count();
        $data['Under Testing'] = Task::where('module_id', $moduleId)
                                ->where('status', 'Under Testing')->count();
        $data['Redevelop'] = Task::where('module_id', $moduleId)
                                ->where('status', 'Redevelop')->count();
        $data['Completed'] = Task::where('module_id', $moduleId)
                                ->where('status', 'Completed')->count();                        
        return response()->json([
            'count' => $data
        ], 200);
    }

    public function dependencies($moduleId, $taskId){
        $task = Task::find($taskId);

        $tasks = Module::find($moduleId)->tasks()->where('end_date', '<', $task->start_date)->get();
        
        return response()->json([
            'tasks' => $tasks
        ], 200);
    }
}
