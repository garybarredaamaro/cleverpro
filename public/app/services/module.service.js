(function(){
	'use strict';

	angular
		.module('app.services')
		.factory('ModuleService', ModuleService);

	ModuleService.$inject = ['$http'];

	function ModuleService($http){
		var service = {
			getAll: getAll,
			getById: getById,
			getByProject: getByProject,
			addModule: addModule,
			deleteModule: deleteModule,
			updateModule: updateModule,
			getProgress: getProgress,
			gantt: gantt,
			getDependencies: getDependencies,
			getByTasks: getByTasks
		};

		return service;

		//////////

		function getAll(){
			return $http.get('api/v1/modules').then(handleSuccess, handleError('Error getting all modules'));
		}

		function getById(id){
			return $http.get('api/v1/modules/' + id).then(handleSuccess, handleError('Error getting module by id'));
		}

		function getByProject(id){
			return $http.get('api/v1/projects/' + id + '/modules').then(handleSuccess, handleError('Error getting modules by project id'));
		}	

		function addModule(module){
			return $http.post('api/v1/modules', module).then(handleSuccess, function(data){return data;});
		}

		function deleteModule(id){
			return $http.delete('api/v1/modules/' + id).then(handleSuccess, handleError('Error deleting module'));
		}

		function updateModule(module){
			return $http.put('api/v1/modules/' + module.id, module).then(handleSuccess, handleError('Error updating module'));
		}

		function getProgress(id){
			return $http.get('api/v1/modules/' + id + '/progress').then(handleSuccess, handleError('Error getting module progress'));
		}

		function gantt(id){
			return $http.get('api/v1/modules/' + id + '/tasks/gantt').then(handleSuccess, handleError('Error getting module gantt'));
		}

		function getDependencies(projectId, moduleId){
			return $http.get('api/v1/projects/' + projectId + '/modules/' + moduleId +'/dependencies').then(handleSuccess, handleError('Error getting module dependencies'));
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

		//Aprot
		function getByTasks(id){
			return $http.get('api/v1/tasks/' + id).then(handleSuccess, handleError('Error getting tasks by id'));
		}
	}
})();