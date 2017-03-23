<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Models\Task;

class TaskController extends Controller
{
    public function get($taskId = 0){
    	if($taskId == 0){
			return response()->json([
				'tasks' => Task::all()
			], 200);
		}

		return response()->json([
			'task' => Task::find($taskId)
		], 200);
    }

    public function newTask(Request $request){
    	// return response()->json([
     //        'task' => $request->all()
     //    ],200);
    	try{

    	$task = new Task;
        $task->title = $request->title;
        $task->description = $request->description;
        $task->start_date = date('Y-m-d', strtotime($request->start_date));
        $task->end_date = date('Y-m-d', strtotime($request->end_date));
        $task->module_id = $request->module_id;
        $task->developer_id = $request->developer_id;
        $task->tester_id = $request->tester_id;
        $task->save();

         return response()->json([
            'task' => $task
        ],200);
         }catch(Exception $e){
    		return response()->json([
	            'error' => $e->getMessage()
	        ],200);
    	}
    }

    public function deleteTask($taskId){
    	$task = Task::find($taskId);
    	$task->forceDelete();

    	return response()->json([
    		'task' => $task
    	], 200);
    }

    public function edit($taskId, Request $request){
        $task = Task::find($taskId);

        $task->title = $request->title;
        $task->description = $request->description;
        $task->status = $request->status;
        $task->depends_on = $request->depends_on;
        $task->start_date = date('Y-m-d', strtotime($request->start_date));
        $task->end_date = date('Y-m-d', strtotime($request->end_date));
        $task->developer_id = $request->developer_id;
        $task->tester_id = $request->tester_id;

        $task->save();

        return response()->json([
            'task' => $task
        ], 200);
    }
}
