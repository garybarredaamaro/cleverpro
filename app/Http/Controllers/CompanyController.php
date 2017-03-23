<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;

use App\Models\Company;
use App\Models\User;

class CompanyController extends Controller
{	
    public function get($companyId = 0){
    	if($companyId == 0){
			return response()->json([
				'companies' => Company::all()
			],200);	
    	}
    	return response()->json([
			'company' => Company::find($companyId)
		],200);
    	
    }

    public function users($companyId){
    	return response()->json([
			'users' => DB::table('view_users')->where('company_id', $companyId)->get()
		],200);
    }

    public function projects($companyId){
    	return response()->json([
			'projects' => Company::find($companyId)->projects
		],200);
    }

    public function guests($companyId){
        return response()->json([
            'users' => Company::find($companyId)->users->where('user_type_id', 3)
        ],200);
    }

    public function development_leads($companyId){
        return response()->json([
            'users' => Company::find($companyId)->users->where('user_type_id', 4)
        ],200);
    }

    public function test_leads($companyId){
        return response()->json([
            'users' => Company::find($companyId)->users->where('user_type_id', 5)
        ],200);
    }

    public function developers($companyId){
        return response()->json([
            'users' => Company::find($companyId)
                            ->users
                            ->whereIn('user_type_id', [6, 4])
                           
        ],200);
    }

    public function testers($companyId){
        return response()->json([
            'users' => Company::find($companyId)->users->whereIn('user_type_id', [7, 5])
        ],200);
    }

    public function edit($companyId, Request $request){
        $company = Company::find($companyId);
        $company->name = $request->name;
        $company->description = $request->description;
        $company->save();

        return response()->json([
            'company' => $company
        ],200);
    }

    public function available_users($companyId){
        $users =  Company::find($companyId)->users;
        //$users =  DB::table('view_users')->where('id', $userId)->get();

        $available_users = array();
        foreach ($users as $user) {
            if(User::find($user->id)->projects()->count() == 0){
                array_push($available_users, $user);
            }
        }
        return response()->json([
            'users' => $available_users
        ],200);
    }

}
