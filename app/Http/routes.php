<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('index');
});

Route::get('/run', function(){

	exec('phpunit --log-json ../storage/logs/tests.log --bootstrap ../bootstrap/autoload.php ../tests', $output);
	
	return response()->json(['success' => true], 200);

});

Route::get('/todo', function(){
	return view('login_form.login');
});

Route::post('/todo/submit', function(Request $request){
	if(($request->name == 'Gary') && ($request->password == 'gary')){
		return view('login_form.success');
	}else{
		return view('login_form.failed');
	}
	
});

Route::auth();

Route::get('/home', 'HomeController@index');

Route::group(['prefix' => 'api/v1'], function(){

	Route::get('companies/{companyId?}', 'CompanyController@get');
	Route::put('companies/{companyId}', 'CompanyController@edit');
	Route::get('companies/{companyId?}/users', 'CompanyController@users');
	Route::get('companies/{companyId?}/available_users', 'CompanyController@available_users');
	Route::get('companies/{companyId?}/projects', 'CompanyController@projects');
	Route::get('companies/{companyId?}/guests', 'CompanyController@guests');
	Route::get('companies/{companyId?}/development_leads', 'CompanyController@development_leads');
	Route::get('companies/{companyId?}/test_leads', 'CompanyController@test_leads');
	Route::get('companies/{companyId?}/developers', 'CompanyController@developers');
	Route::get('companies/{companyId?}/testers', 'CompanyController@testers');

	Route::get('users/{userId?}', 'UserController@get');
	Route::get('users/{userId}/projects', 'UserController@projects');
	Route::get('users/{userId}/tasks', 'UserController@tasks');
	Route::get('users/{userId}/issues', 'UserController@issues');
	Route::post('users', 'UserController@newUser');
	Route::put('users/{userId}', 'UserController@edit');
	Route::delete('users/{userId}', 'UserController@delete');

	Route::get('projects/{projectId?}', 'ProjectController@get');
	Route::get('projects/{projectId}/users', 'ProjectController@users');
	Route::get('projects/{projectId}/modules', 'ProjectController@modules');
	Route::get('projects/{projectId}/modules/{moduleId}/dependencies', 'ProjectController@dependencies');
	Route::get('projects/{projectId}/modules/gantt', 'ProjectController@gantt');
	Route::get('projects/{projectId}/issues', 'ProjectController@issues');
	Route::get('projects/{projectId}/progress', 'ProjectController@progress');
	Route::get('projects/{projectId}/new_member/{userId}', 'ProjectController@new_member');
	Route::delete('projects/{projectId}/delete_member/{userId}', 'ProjectController@delete_member');
	Route::post('projects', 'ProjectController@newProject');
	Route::get('projects/{projectId}/delete', 'ProjectController@delete');
	Route::get('newproject', 'ProjectController@newProject');
	Route::put('projects/{projectId}', 'ProjectController@edit');

	Route::get('modules/{moduleId?}', 'ModuleController@get');
	Route::get('modules/{moduleId}/tasks', 'ModuleController@tasks');
	Route::get('modules/{moduleId}/tasks/{taskId}/dependencies', 'ModuleController@dependencies');
	Route::get('modules/{moduleId}/progress', 'ModuleController@progress');
	Route::get('modules/{moduleId}/tasks/gantt', 'ModuleController@gantt');
	Route::post('modules', 'ModuleController@newModule');
	Route::delete('modules/{moduleId}', 'ModuleController@delete');
	Route::put('modules/{moduleId}', 'ModuleController@edit');

	Route::get('tasks/{taskId?}', 'TaskController@get');
	Route::post('tasks', 'TaskController@newTask');
	Route::delete('tasks/{taskId}', 'TaskController@deleteTask');
	Route::put('tasks/{taskId}', 'TaskController@edit');

	Route::get('issues/{issueId?}', 'IssueController@get');
	Route::post('issues', 'IssueController@newIssue');
	Route::delete('issues/{issueId}', 'IssueController@delete');
	Route::put('issues/{issueId}', 'IssueController@edit');

	Route::get('user_types', 'UserTypeController@getAll');

	Route::post('login', 'LoginController@login');
	Route::post('register', 'RegisterController@register');


	Route::get('test', 'RegisterController@test');
});
