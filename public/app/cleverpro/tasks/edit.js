(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('TaskEditController', TaskEditController);

	TaskEditController.$inject = ['UserService', 'TaskService', 'UserSession', '$state', '$stateParams'];

	function TaskEditController(UserService, TaskService, UserSession, $state, $stateParams){
		var vm = this;

		vm.user = {};

		vm.taskId = $stateParams.taskId;
		vm.task = {};
		vm.tasks = [];
		vm.developers = [];
		vm.testers = [];
		vm.disableForms = disableForms;
		vm.isDevLead = isDevLead;
		vm.save = save;

		vm.statuses = ['Not Started', 'Under Development', 'Ready For Testing', 'Under Testing', 'Redevelop', 'Completed'];

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				getTaskDetails();	
				getDevelopersByCompany();
				getTestersByCompany();
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

		function getTaskDetails(){
			TaskService.getById(vm.taskId).then(function(data){
				vm.task = data.task;
				vm.task.start_date = new Date(data.task.start_date);
				vm.task.end_date = new Date(data.task.end_date);

				getDependencies();
			});
		}

		function getDependencies(){
			TaskService.getDependencies(vm.task.module_id, vm.task.id).then(function(data){
				vm.tasks = data.tasks;
			});
		}

		
		function save(){
			console.log(vm.task);
			TaskService.updateTask(vm.task).then(function(data){
				alert('task updated successfully.');
				$state.go('welcome.tasks-details', {taskId: vm.task.id});
			});
		}

		function disableForms(){	
			if(vm.user.user_type_id == 5){
				return true;
			}
				return false;				
		}

		function isDevLead(){
			if(vm.user.user_type_id == 4){
				return true;
			}
				return false;		
		}

		function cancel(){
			$state.go('welcome.tasks', {moduleId: vm.moduleId});
		}
		function compareDate(form){
			form.start_date.$setValidity("validDate", true);
			if(vm.task.start_date != '' && vm.task.end_date != ''){
				if(vm.task.start_date >= vm.task.end_date){
					form.start_date.$setValidity("validDate", false);
				}
			}
		}

	}

})();