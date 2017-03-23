(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('ProjectDetailsController', ProjectDetailsController);

	ProjectDetailsController.$inject = ['UserService', 'ProjectService', 'UserSession', '$state', '$stateParams'];

	function ProjectDetailsController(UserService, ProjectService, UserSession, $state, $stateParams){
		var vm = this;

		vm.user = {};

		vm.projectId = $stateParams.projectId;
		vm.project = {};
		vm.guest = '';
		vm.project_manager = '';

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				getProjectDetails();	
			}
		}

		//////////

		function getProjectDetails(){
			ProjectService.getById(vm.projectId).then(function(data){
				vm.project = data.project;
				getNames();
			});
		}

		function getNames(){
		
			UserService.getById(vm.project.guest_id).then(function(data){
				vm.guest = data.user.first_name + ' ' + data.user.last_name;
			});

			UserService.getById(vm.project.project_manager_id).then(function(data){
				vm.project_manager = data.user.first_name + ' ' + data.user.last_name;
			});
		}

	}

})();