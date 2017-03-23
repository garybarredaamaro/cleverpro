(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('TaskController', TaskController);

	TaskController.$inject = ['TaskService', 'UserSession', 'ModuleService', '$stateParams', '$state'];

	function TaskController(TaskService, UserSession, ModuleService, $stateParams, $state){
		var vm = this;

		vm.user = {};
		vm.tasks = [];
		vm.module = {};
		vm.selectedTask = {};

		vm.moduleId = $stateParams.moduleId;

		vm.deleteTask = deleteTask;
		vm.showAddTask = showAddTask;
		vm.showRemoveTask = showRemoveTask;
		vm.showEditTask = showEditTask;
		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				
				if(vm.moduleId){
					
					ModuleService.getById(vm.moduleId).then(function(data){
						if(data.module){
							vm.module = data.module;
						}else{
							alert('No module with id ' + vm.module.id);
							$state.go('welcome.projects');
						}
					});
					getTasksByModule(vm.moduleId);
				}else{
					getTasksByUser(vm.user.id);
				}
				
				
				
			}
		}

		//////////

		function getTasksByModule(id){
			TaskService.getByModule(id).then(function(data){
				vm.tasks = data.tasks;
				console.log(vm.tasks);
			});
		}

		function getTasksByUser(id){
			TaskService.getByUser(id).then(function(data){
				vm.tasks = data.tasks;
			});
		}

		function deleteTask(task){
			confirm('Are you sure you want to delete task?');

			// TaskService.deleteTask(task.id).then(function(data){
			// 	$state.reload();
			// });
			
		}

		function showAddTask(){
			if((vm.user.user_type_id == 4) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}

		function showRemoveTask(){
			if((vm.user.user_type_id == 4) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}

		function showEditTask(){
			if((vm.user.user_type_id == 4) || (vm.user.user_type_id == 2) || (vm.user.user_type_id == 5) || (vm.user.user_type_id == 6) || (vm.user.user_type_id == 7)){
				return true;
			}
			return false;
		}
	}

})();