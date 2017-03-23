(function(){
	'use strict';

	angular
	.module('app.cleverpro')
	.controller('TaskAddController', TaskAddController);

	TaskAddController.$inject = ['TaskService', 'UserSession', 'ModuleService', 'UserService', '$stateParams', '$state'];

	function TaskAddController(TaskService, UserSession, ModuleService, UserService, $stateParams, $state){
		var vm = this;

		vm.user = {};
		vm.moduleId = $stateParams.moduleId;
		vm.module = {
			start_date:'',
			end_date:''
		};
		vm.developers = [];
		vm.testers = [];
		vm.cancel = cancel;
		vm.compareDate = compareDate;
		vm.compareDate1 = compareDate1;
		vm.add = add;
		vm.error = null;
		vm.error1 = null;
		vm.task = {
			module_id: 0,
			developer_id: 0,
			tester_id: 0,
			title: '',
			description: '',
			start_date: '',
			end_date: ''
		};

		
	
		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				
				if($stateParams.moduleId){
					vm.moduleId = $stateParams.moduleId;
					ModuleService.getById(vm.moduleId).then(function(data){
						if(data.module){
							vm.module = data.module;
							console.log(vm.moduleId);
							getDevelopersByCompany();
							getTestersByCompany();
						}else{
							alert('No module with id ' + vm.module);
							$state.go('welcome.projects');
						}
					});
				}
			}
		}

		//////////

		function getDevelopersByCompany(){
			UserService.getDevelopersByCompany(vm.user.company_id).then(function(data){
				vm.developers = data.users;
			});
		}

		function getTestersByCompany(){
			UserService.getTestersByCompany(vm.user.company_id).then(function(data){
				vm.testers = data.users;
			});
		}

		function add(){
			vm.task.module_id = vm.moduleId;
			TaskService.addTask(vm.task).then(function(data){
				// console.log(data);
				window.location.reload();
				$state.go('welcome.task', {moduleId: vm.moduleId});
				
			});
		}

		function cancel(){
			$state.go('welcome.tasks', {moduleId: vm.moduleId});
		}

		function compareDate(){
			if(new Date(vm.task.start_date) != ''){
				if(new Date(vm.task.start_date) >= new Date(vm.module.start_date) &&   new Date(vm.task.start_date) <= new Date(vm.module.end_date)){
					console.log(new Date(vm.task.start_date),'success')
					vm.error = '';
				}else{
					console.log(new Date(vm.module.start_date), 'error');
					vm.error = 'ERROR: Task start date must be within the module ECD ';
				}
			}else{
					vm.error = 'End Date is required';
			}
		}

		function compareDate1() {

			// alert(123);
			if(new Date(vm.task.start_date) != '' && new Date(vm.task.end_date) != ''){
				if(new Date(vm.task.end_date) <= new Date(vm.module.end_date)){
					console.log(new Date(vm.task.start_date), 'success')
					vm.error1 = '';
					 if(new Date(vm.task.end_date) >= new Date(vm.task.start_date)){
						console.log(new Date(vm.task.start_date), 'success')
						vm.error1 = '';
					 }else{
					 	console.log(new Date(vm.task.start_date),'error')
						vm.error1 = 'ERROR: Start date must be earlier than end date';
					 }
				}else {
					console.log(new Date(vm.task.start_date),'error')
					vm.error1 = 'ERROR: Task end date must be within the module ECD.';

				}
			}else{
				console.log(new Date(vm.task.start_date),'error')
				vm.error1 = 'End Date is required';
			}
		}

	}

})();