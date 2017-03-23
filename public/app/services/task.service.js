(function(){
	'use strict';

	angular
		.module('app.services')
		.factory('TaskService', TaskService);

	TaskService.$inject = ['$http'];

	function TaskService($http){
		var service = {
			getAll: getAll,
			getById: getById,
			getByModule: getByModule,
			getByUser: getByUser,
			addTask: addTask,
			deleteTask: deleteTask,
			updateTask: updateTask,
			getDependencies: getDependencies,
			run: run
		};

		return service;

		//////////

		function getAll(){
			return $http.get('api/v1/tasks').then(handleSuccess, handleError('Error getting all tasks'));
		}

		function getById(id){
			return $http.get('api/v1/tasks/' + id).then(handleSuccess, handleError('Error getting tasks by id'));
		}

		function getByModule(id){
			return $http.get('api/v1/modules/' + id + '/tasks').then(handleSuccess, handleError('Error getting tasks by module id'));
		}

		function getByUser(id){
			return $http.get('api/v1/users/' + id + '/tasks').then(handleSuccess, handleError('Error getting tasks by user id'));
		}

		function addTask(task){
			return $http.post('api/v1/tasks', task).then(handleSuccess, function(data){return data;});
		}

		function deleteTask(id){
			return $http.delete('api/v1/tasks/' + id).then(handleSuccess, handleError('Error deleting task'));
		}

		function updateTask(task){
			return $http.put('api/v1/tasks/' + task.id, task).then(handleSuccess, handleError('Error updating task'));
		}

		function getDependencies(moduleId, taskId){
			return $http.get('api/v1/modules/' + moduleId + '/tasks/' + taskId +'/dependencies').then(handleSuccess, handleError('Error getting task dependencies'));
		}

		function run(){
			return $http.get('run').then(handleSuccess, handleError('Error running tests'));
		}

		///////////

		function handleSuccess(res){
			return res.data;
		}

		function handleError(error){
			return function(){
				return {success: false, message: error};
			};
		}
	}
})();