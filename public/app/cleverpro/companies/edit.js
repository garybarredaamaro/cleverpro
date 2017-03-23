(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('CompanyEditController', CompanyEditController);

	CompanyEditController.$inject = ['CompanyService', 'UserSession', '$state'];

	function CompanyEditController(CompanyService, UserSession, $state){
		var vm = this;

		vm.user = {};
		vm.company = {};

		vm.save = save;
		vm.cancel = cancel;

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

		function save(){
			CompanyService.updateCompany(vm.company).then(function(data){
				alert('Company updated successfully');
				$state.go('home.aboutthecompany');
			});
		}

		function cancel(){
			$state.go('home.aboutthecompany');
		}

	}

})();