(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('CompanyController', CompanyController);

	CompanyController.$inject = ['CompanyService', 'UserSession', '$state'];

	function CompanyController(CompanyService, UserSession, $state){
		var vm = this;

		vm.user = {};
		vm.company = {};

		vm.showEdit = showEdit;

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();			
				getCompanyDetails();
			}
		}

		//////////

		function getCompanyDetails(){
			CompanyService.getById(vm.user.company_id).then(function(data){
				vm.company = data.company;
			});
		}

		function showEdit(){
			if((vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}

	}

})();