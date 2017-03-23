(function(){
	'use strict';

	angular
	.module('app.cleverpro')
	.controller('ModuleAddController', ModuleAddController);

	ModuleAddController.$inject = ['ModuleService', 'UserSession', 'ProjectService', '$stateParams', '$state'];

	function ModuleAddController(ModuleService, UserSession, ProjectService, $stateParams, $state){
		var vm = this;

		vm.user = {};
		vm.projectId = $stateParams.projectId;
		vm.module = {
			project_id: 0,
			title: '',
			description: '',
			start_date: '',
			end_date: ''
		};
		vm.project = {
			start_date:'',
			end_date:''
		};
		vm.add = add;
		vm.error = null;
		vm.error1 = null;
		vm.test = vm.test;
		vm.cancel = cancel;
		vm.compareDate1 = compareDate1;
		vm.compareDate2 = compareDate2;

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
			}
		}

		//////////

		function add(){
			vm.module.project_id = vm.projectId;
			ModuleService.addModule(vm.module).then(function(data){
				$state.go('welcome.modules');
				window.location.reload();
			});
		}

		function cancel(){
			$state.go('welcome.modules',{projectId:vm.projectId});
		}
		// function compareDate(form){
		// 	form.start_date.$setValidity("validDate", true);
		// 	if(vm.module.start_date != '' && vm.module.end_date != ''){
		// 		if(vm.module.start_date >= vm.module.end_date){
		// 			form.start_date.$setValidity("validDate", false);
		// 		}
		// 	}
		// }

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
					vm.error = 'Start Date is required';

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
					vm.error1 = 'ERROR: End date must be within the projects ECD';

				}
			}else{
				console.log(new Date(vm.module.start_date),'error')
				vm.error1 = 'End Date is required';
			}
		}
	}

})();