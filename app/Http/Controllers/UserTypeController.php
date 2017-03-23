<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Models\UserType;

class UserTypeController extends Controller
{
    public function getAll(){
    	return response()->json([
			'user_types' => UserType::all()
		],200);	
    }
}
