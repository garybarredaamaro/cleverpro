(function(){
	'use strict';

	angular
		.module('app.services')
		.factory('IssueService', IssueService);

	IssueService.$inject = ['$http'];

	function IssueService($http){
		var service = {
			getAll: getAll,
			getById: getById,
			getByProject: getByProject,
			getByUser: getByUser,
			addIssue: addIssue,
			deleteIssue: deleteIssue,
			updateIssue: updateIssue
		};

		return service;

		//////////

		function getAll(){
			return $http.get('api/v1/issues').then(handleSuccess, handleError('Error getting all issues'));
		}

		function getById(id){
			return $http.get('api/v1/issues/' + id).then(handleSuccess, handleError('Error getting issue by id'));
		}

		function getByProject(id){
			return $http.get('api/v1/projects/' + id + '/issues').then(handleSuccess, handleError('Error getting issues by project id'));
		}

		function getByUser(id){
			return $http.get('api/v1/users/' + id + '/issues').then(handleSuccess, handleError('Error getting issues by user id'));
		}	

		function addIssue(issue){
			return $http.post('api/v1/issues', issue).then(handleSuccess, handleError('Error adding issue'));
		}

		function deleteIssue(id){
			return $http.delete('api/v1/issues/' + id).then(handleSuccess, handleError('Error deleting issue'));
		}

		function updateIssue(issue){
			return $http.put('api/v1/issues/' + issue.id, issue).then(handleSuccess, handleError('Error updating issue'));
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