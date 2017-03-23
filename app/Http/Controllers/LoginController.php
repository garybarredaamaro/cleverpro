<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;

use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request){
    	$user = User::where('email', $request->email)
    				->first();

    	//if passwords match
    	if (Hash::check($request->password, $user->password)) {
		    return response()->json([
				'user' => DB::table('view_users')->where('id', $user->id)->first()
			],200);
		}

		//error
    	return response()->json([
			'user' => null
		],200);
    }
}
