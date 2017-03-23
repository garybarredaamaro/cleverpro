<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;

use App\Models\User;
use App\Models\Company;
use App\Models\ProjectMember;
use App\Models\Task;
use App\Models\Issue;
use App\Models\Project;

class UserController extends Controller
{
    public function getByCompany($companyId = 0){
    	if($companyId == 0){
    		return response()->json([
				'error' => 'company id missing'
			],400);	
    	}

   		return response()->json([
			'users' => Company::find($companyId)->users
		],200);	
    }

    public function get($userId = 0){
    	if($userId == 0){
			return response()->json([
				'users' => User::all()
			],200);	
    	}
    	
    	return response()->json([
            //'user' => User::find($userId)
			'user' => DB::table('view_users')->where('id', $userId)->first()
		],200);
    }

    public function projects($userId){
        $user = User::find($userId);
       
        if($user->user_type_id == 8){
            //if project manager
            return response()->json([
                'projects' => Project::where('project_manager_id', $userId)->get()
            ],200);
        }else if($user->user_type_id == 3){
            //if guest
            return response()->json([
                'projects' => Project::where('guest_id', $userId)->get()
            ],200);
        }else if($user->user_type_id == 1){
            //if admin
            return response()->json([
                'projects' => Project::all()
            ],200);
        }else if($user->user_type_id == 2){
            //if owner
            return response()->json([
                'projects' => Project::where('company_id', $user->company_id)->get()
            ],200);
        }

    	return response()->json([
			'projects' => $user->projects
		],200);
    }

    public function tasks($userId){
        return response()->json([
            'tasks' => Task::where('developer_id', $userId)
                            ->orWhere('tester_id', $userId)
                            ->get()
        ],200);
    }

    public function issues($userId){
        return response()->json([
            'issues' => Issue::where('developer_id', $userId)
                            ->orWhere('reporter_id', $userId)
                            ->get()
        ],200);
    }

    public function newUser(Request $request){

        $user = new User;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->cp_number = $request->cp_number;
        $user->password = Hash::make($request->password);
        $user->company_id = $request->company_id;
        $user->user_type_id = $request->user_type_id;
        $user->save();

        return response()->json([
            'user' => $user
        ],200);
    }

    public function edit($userId, Request $request){

        $user = User::find($userId);
        $user->first_name = $request->first_name;   
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->cp_number = $request->cp_number;
        $user->user_type_id = $request->user_type_id;

        if($request->password){
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'user' => $user
        ],200);
    }

    public function delete($userId){
        $user = User::find($userId);
        $user->forceDelete();
         return response()->json([
            'user' => $user
        ],200);
    }
}
