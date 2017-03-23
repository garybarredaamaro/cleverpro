(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('ModuleDetailsController', ModuleDetailsController);

	ModuleDetailsController.$inject = ['ModuleService', 'UserSession', '$state', '$stateParams'];

	function ModuleDetailsController(ModuleService, UserSession, $state, $stateParams){
		var vm = this;

		vm.user = {};

		vm.moduleId = $stateParams.moduleId;
		vm.module = {};

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				getModuleDetails();	
			}
		}

		//////////

		function getModuleDetails(){
			ModuleService.getById(vm.moduleId).then(function(data){
				vm.module = data.module;
			});
		}
	}

})();