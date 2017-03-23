<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;

use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Company;
use App\Models\User;
use App\Models\Module;
use App\Models\Task;
use App\Models\ProjectUser;
use App\Models\Issue;

class ProjectController extends Controller
{
	public function get($projectId = 0){
		if($projectId == 0){
			return response()->json([
				'projects' => Project::all()
			], 200);
		}

		return response()->json([
			'project' => Project::find($projectId)
		], 200);
	}

    public function delete($projectId){
        // $project = Project::find($projectId);
        // $project->forceDelete();
        //  return response()->json([
        //     'project' => null
        // ],200);

        $project = Project::find($projectId);
        $project->forceDelete();
        return response()->json([
            'project' => $project
        ], 200);
    }

    public function users($companyId){
    	return response()->json([
			'project_users' => Project::find($companyId)->users
		],200);
    }

    public function modules($companyId){
    	return response()->json([
			'modules' => Project::find($companyId)->modules
		],200);
    }

    public function issues($companyId){
    	return response()->json([
			'issues' => Project::find($companyId)->issues
		],200);
    }

  
    public function newProject(Request $request){
    	try{
        $project = new Project;
        $project->title = $request->title;
        $project->description = $request->description;
        $project->start_date = date('Y-m-d', strtotime($request->start_date));
        $project->end_date = date('Y-m-d', strtotime($request->end_date));
        $project->guest_id = $request->guest_id;
        $project->company_id = $request->company_id;
        $project->project_manager_id = $request->project_manager_id;
        $project->save();

        User::find($project->project_manager_id)->projects()->attach($project->id);


         return response()->json([
            'project' => $project
        ],200);

    	}catch(Exception $e){
    		return response()->json([
	            'error' => $e->getMessage()
	        ],200);
    	}

       
    }

    public function progress($projectId){
        $data = array();

        $data['Not Started'] = Module::where('project_id', $projectId)
                                ->where('status', 'Not Started')->count();
        $data['In Progress'] = Module::where('project_id', $projectId)
                                ->where('status', 'In Progress')->count();
        $data['Completed'] = Module::where('project_id', $projectId)
                                ->where('status', 'Completed')->count();

        return response()->json([
            'count' => $data
        ], 200);
    }

    public function new_member($projectId, $userId){
        $member = ProjectUser::where('project_id', $projectId)
                                ->where('user_id', $userId)
                                ->get();

        if($member->count()){
            return response()->json([
                'exists' => true
            ],200);
        }else{
            
            User::find($userId)->projects()->attach($projectId);

            return response()->json([
                'member' => $member,
                'exists' => false
            ],200);
        }    
    }

    public function delete_member($projectId, $userId){

        $member = User::find($userId);

        $member->projects()->detach($projectId);

        return response()->json([
            'deleted' => true
        ],200);
    }

    public function edit($projectId, Request $request){
        $project = Project::find($projectId);

        $project->title = $request->title;
        $project->description = $request->description;
        $project->status = $request->status;
        $project->start_date = date('Y-m-d', strtotime($request->start_date));
        $project->end_date = date('Y-m-d', strtotime($request->end_date));
        $project->guest_id = $request->guest_id;

        $project->save();

        return response()->json([
            'project' => $project
        ], 200);
    }

    public function gantt($projectId){
        $modules = DB::table('project_gantt')->where('project_id', $projectId)->get();
        return response()->json([
            'modules' => $modules
        ], 200);
    }

    public function dependencies($projectId, $moduleId){
        $module = Module::find($moduleId);

        $modules = Project::find($projectId)->modules()->where('end_date', '<', $module->start_date)->get();
        
        return response()->json([
            'modules' => $modules
        ], 200);
    }
}


