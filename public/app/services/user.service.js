(function(){
	'use strict';

	angular
		.module('app.services')
		.factory('UserService', UserService);

	UserService.$inject = ['$http'];

	function UserService($http){
		var service = {
			getAll: getAll,
			getById: getById,
			getByCompany: getByCompany,
			getByProject: getByProject,
			getUserTypes: getUserTypes,
			getGuestsByCompany: getGuestsByCompany,
			getDevelopmentLeadsByCompany: getDevelopmentLeadsByCompany,
			getDevelopersByCompany: getDevelopersByCompany,
			getTestersByCompany: getTestersByCompany,
			getTestLeadsByCompany: getTestLeadsByCompany,
			addUser: addUser,
			updateUser: updateUser,
			deleteUser: deleteUser,
			getAvailableUsersByCompany: getAvailableUsersByCompany
		};

		return service;

		//////////

		function getAll(){
			return $http.get('api/v1/users').then(handleSuccess, handleError('Error getting all users'));
		}

		function getById(id){
			return $http.get('api/v1/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
		}

		function getByCompany(id){
			return $http.get('api/v1/companies/' + id + '/users').then(handleSuccess, handleError('Error getting user by company id'));
		}

		function getByProject(id){
			return $http.get('api/v1/projects/' + id + '/users').then(handleSuccess, handleError('Error getting users by project id'));
		}

		function getGuestsByCompany(id){
			return $http.get('api/v1/companies/' + id + '/guests').then(handleSuccess, handleError('Error getting guests by company id'));
		}

		function getDevelopmentLeadsByCompany(id){
			return $http.get('api/v1/companies/' + id + '/development_leads').then(handleSuccess, handleError('Error getting guests by company id'));
		}

		function getTestLeadsByCompany(id){
			return $http.get('api/v1/companies/' + id + '/test_leads').then(handleSuccess, handleError('Error getting guests by company id'));
		}

		function getDevelopersByCompany(id){
			return $http.get('api/v1/companies/' + id + '/developers').then(handleSuccess, handleError('Error getting developers by company id'));
		}

		function getTestersByCompany(id){
			return $http.get('api/v1/companies/' + id + '/testers').then(handleSuccess, handleError('Error getting guests by company id'));
		}

		function getUserTypes(){
			return $http.get('api/v1/user_types').then(handleSuccess, handleError('Error getting user types'));
		}		

		function addUser(user){
			return $http.post('api/v1/users', user).then(handleSuccess, handleError('Error adding user'));
		}

		function updateUser(user){
			return $http.put('api/v1/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
		}

		function deleteUser(id){
			return $http.delete('api/v1/users/' + id).then(handleSuccess, handleError('Error deleting user'));
		}

		function getAvailableUsersByCompany(id){
			return $http.get('api/v1/companies/' + id + '/available_users').then(handleSuccess, handleError('Error getting available users'));
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

		// Protty
	
	}
})();