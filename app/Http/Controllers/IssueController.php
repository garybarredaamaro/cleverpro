<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Models\Issue;

class IssueController extends Controller
{
    public function get($issueId = 0){
    	if($issueId == 0){
			return response()->json([
				'issues' => Issue::all()
			], 200);
		}

		return response()->json([
			'issue' => Issue::find($issueId)
		], 200);
    }

    public function newIssue(Request $request){
    	$issue 					= new Issue;

    	$issue->project_id 		= $request->project_id;
    	$issue->reporter_id		= $request->reporter_id;
    	$issue->developer_id	= $request->developer_id;
    	$issue->title 			= $request->title;
    	$issue->description 	= $request->description;
    	$issue->date 			= date('Y-m-d');
        $issue->issue_type      = $request->issue_type;
    	$issue->priority 		= $request->priority;
    	$issue->severity 		= $request->severity;

    	$issue->save();

        $issue->issue_id = $request->project_id . '-' . $issue->id;

        $issue->save();

    	return response()->json([
    		'issue' => $issue
    	], 200);
    }

    public function delete($issueId){
    	$issue = Issue::find($issueId);
    	$issue->forceDelete();

    	return response()->json([
    		'issue' => $issue
    	], 200);
    }

    public function edit($issueId, Request $request){
        $issue                  = Issue::find($issueId);

        $issue->reporter_id     = $request->reporter_id;
        $issue->developer_id    = $request->developer_id;
        $issue->title           = $request->title;
        $issue->description     = $request->description;
        $issue->status          = $request->status;
        $issue->priority        = $request->priority;
        $issue->severity        = $request->severity;

        $issue->save();

        return response()->json([
            'issue' => $issue
        ], 200);
    }
}