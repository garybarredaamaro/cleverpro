(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('ModuleEditController', ModuleEditController);

	ModuleEditController.$inject = ['UserService', 'ModuleService', 'UserSession', 'ProjectService','$state', '$stateParams'];

	function ModuleEditController(UserService, ModuleService, UserSession, ProjectService, $state, $stateParams){
		var vm = this;

		vm.user = {};
		vm.moduleId = $stateParams.moduleId;
		vm.projectId = $stateParams.projectId;
		vm.module = {
			start_date:'',
			end_date:''
		};
		vm.modules = [];
		vm.project = {
			start_date:'',
			end_date:''
		}
		vm.save = save;
		vm.statuses = ['not started', 'in progress', 'completed'];
		vm.cancel = cancel;
		vm.compareDate1 = compareDate1;
		vm.compareDate2 = compareDate2;
		vm.error = null;
		vm.error1 = null;
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
				vm.module.start_date = new Date(data.module.start_date);
				vm.module.end_date = new Date(data.module.end_date);

				getDependencies();
			});
		}

		function getDependencies(){
			ModuleService.getDependencies(vm.module.project_id, vm.module.id).then(function(data){
				vm.modules = data.modules;
			});
		}

		function save(){
			ModuleService.updateModule(vm.module).then(function(data){
				$state.go('welcome.modules-details', {moduleId: vm.module.id});
				window.location.reload();
			});
		}
		function cancel(){
			$state.go('welcome.modules', {moduleId: vm.module.id});
		}
		function compareDate1() {

			// alert(123);
			if(new Date(vm.module.start_date) != ''){
				if (new Date(vm.module.start_date) >= new Date(vm.project.start_date) && new Date(vm.module.start_date) <= new Date(vm.project.end_date) ) {
					// alert(new Date(vm.module.start_date));
					console.log(new Date(vm.module.start_date), 'success')
					vm.error = '';
				}else {
					console.log(new Date(vm.module.start_date),'error')
					vm.error = 'ERROR: Start date must be within the projects ECD';

				}
			}else{
					vm.error = 'Date is required';

			}
			
		}
		function compareDate2() {

			// alert(123);
			if(new Date(vm.module.start_date) != '' && new Date(vm.module.end_date) != ''){
				if(new Date(vm.module.end_date) <= new Date(vm.project.end_date)){
					console.log(new Date(vm.module.start_date), 'success')
					vm.error1 = '';
					 if(new Date(vm.module.end_date) >= new Date(vm.module.start_date)){
						console.log(new Date(vm.module.start_date), 'success')
						vm.error1 = '';
					 }else{
					 	console.log(new Date(vm.module.start_date),'error')
						vm.error1 = 'ERROR: Start date must be earlier than end date';
					 }
				}else {
					console.log(new Date(vm.module.start_date),'error')
					vm.error1 = 'error';

				}
			}else{
				console.log(new Date(vm.module.start_date),'error')
				vm.error1 = 'ERROR';
			}
		}
	}

})();