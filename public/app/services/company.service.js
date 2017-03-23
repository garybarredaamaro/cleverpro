(function(){
	'use strict';

	angular
		.module('app.services')
		.factory('CompanyService', CompanyService);

	CompanyService.$inject = ['$http'];

	function CompanyService($http){
		var service = {
			getAll: getAll,
			getById: getById,
			updateCompany: updateCompany
		};

		return service;

		//////////

		function getAll(){
			return $http.get('api/v1/companies').then(handleSuccess, handleError('Error getting all companies'));
		}

		function getById(id){
			return $http.get('api/v1/companies/' + id).then(handleSuccess, handleError('Error getting company by id'));
		}

		function updateCompany(company){
			return $http.put('api/v1/companies/' + company.id, company).then(handleSuccess, handleError('Error updating company'));
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