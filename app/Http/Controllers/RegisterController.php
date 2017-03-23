<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests;

use App\Models\User;
use App\Models\Company;


class RegisterController extends Controller
{
    public function register(Request $request){
  
    	$company = new Company;
    	$company->name = $request->name;
    	$company->description = $request->description;
    	$company->save();

    	$user = new User;
    	$user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->cp_number = $request->cp_number;
        $user->password = Hash::make($request->password);
        $user->company_id = $company->id;
        $user->user_type_id = 2;
    	$user->save();

    	 return response()->json([
            'user' => $user,
            'company' => $company
        ],200);
    }

    public function test(){
    }
}
