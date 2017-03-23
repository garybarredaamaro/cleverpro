(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('TaskDetailsController', TaskDetailsController);

	TaskDetailsController.$inject = ['UserService', 'TaskService', 'UserSession', '$state', '$stateParams'];

	function TaskDetailsController(UserService, TaskService, UserSession, $state, $stateParams){
		var vm = this;

		vm.user = {};

		vm.taskId = $stateParams.taskId;
		vm.task = {};

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				getTaskDetails();	
			}
		}

		//////////

		function getTaskDetails(){
			TaskService.getById(vm.taskId).then(function(data){
				vm.task = data.task;
			});
		}
	}

})();