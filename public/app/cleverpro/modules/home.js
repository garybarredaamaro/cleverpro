(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('ModuleController', ModuleController);

	ModuleController.$inject = ['ModuleService', 'UserSession', 'ProjectService', '$stateParams', '$state'];

	function ModuleController(ModuleService, UserSession, ProjectService, $stateParams, $state){
		var vm = this;

		vm.user = {};
		vm.projectId = $stateParams.projectId;
		vm.modules = [];
		vm.project = {};
		vm.task = {};
		vm.selectedModule = {};
		vm.deleteModule = deleteModule;
		vm.showAddModule = showAddModule;
		vm.showRemoveModule = showRemoveModule;
		vm.showEditModule = showEditModule;
		
		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				
				ProjectService.getById(vm.projectId).then(function(data){
					if(data.project){
						vm.project = data.project;
					}else{
						alert('No Project with id ' + vm.projectId);
						$state.go('welcome.projects');
					}
					
				});
				
				getModulesByProject();
			}
		}

		//////////

		function getModulesByProject(){
			ModuleService.getByProject(vm.projectId).then(function(data){
				vm.modules = data.modules;
				if(vm.modules.length){
					vm.empty = false;
				}else{
					vm.empty = true;
				}
			});
		}

		function deleteModule(module){
			var ans = confirm('Are you sure you want to delete module?');
			if(ans){
				ModuleService.deleteModule(module.id).then(function(data){
				$state.reload();
				});
			}
			
		}

		function showAddModule(){
			if((vm.user.user_type_id == 8) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}

		function showEditModule(){
			if((vm.user.user_type_id == 8) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}

		function showRemoveModule(){
			if((vm.user.user_type_id == 8) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}

	}

})();