(function(){
	'use strict';

	angular
		.module('app.services')
		.factory('ProjectService', ProjectService);

	ProjectService.$inject = ['$http'];

	function ProjectService($http){
		var service = {
			getAll: getAll,
			getById: getById,
			getByCompany: getByCompany,
			getByUser: getByUser,
			addProject: addProject,
			deleteProject: deleteProject,
			newMember: newMember,
			deleteMember: deleteMember,
			getProgress: getProgress,
			updateProject: updateProject,
			gantt: gantt,
			getTasks : getTasks,
			getModuleProgress : getModuleProgress
		};

		return service;

		//////////

		function getAll(){
			return $http.get('api/v1/projects').then(handleSuccess, handleError('Error getting all projects'));
		}

		function getById(id){
			return $http.get('api/v1/projects/' + id).then(handleSuccess, handleError('Error getting project by id'));
		}

		function getByCompany(id){
			return $http.get('api/v1/companies/' + id + '/projects').then(handleSuccess, handleError('Error getting project by company id'));
		}

		function getByUser(id){
			return $http.get('api/v1/users/' + id + '/projects').then(handleSuccess, handleError('Error getting projects by user id'));
		}		

		function addProject(project){
			return $http.post('api/v1/projects', project).then(handleSuccess, function(data){return data;});
		}

		function deleteProject(projectId){
			return $http.delete('api/v1/projects/' + projectId).then(handleSuccess, handleError('Error deleting project'));
		}

		function newMember(projectId, userId){
			return $http.get('api/v1/projects/' + projectId + '/new_member/' + userId).then(handleSuccess, handleError('Error adding new member'));
		}

		function deleteMember(projectId, userId){
			return $http.delete('api/v1/projects/' + projectId + '/delete_member/' + userId).then(handleSuccess, handleError('Error deleting member'));
		}

		function getProgress(id){
			return $http.get('api/v1/projects/' + id + '/progress').then(handleSuccess, handleError('Error getting project progress'));
		}

		function updateProject(project){
			return $http.put('api/v1/projects/' + project.id, project).then(handleSuccess, handleError('Error updating project'));
		}

		function gantt(id){
			return $http.get('api/v1/projects/' + id + '/modules/gantt').then(handleSuccess, handleError('Error getting project gantt'));
		}
		/*sampple*/
		function getTasks(id){
			return $http.get('api/v1/modules/' + id + '/tasks').then(handleSuccess, handleError('Error getting project gantt'));	
		}

		function getModuleProgress(id){
			return $http.get('api/v1/modules/' + id + '/progress').then(handleSuccess, handleError('Error getting project gantt'));
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