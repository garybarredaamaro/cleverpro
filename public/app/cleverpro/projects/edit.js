(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('ProjectEditController', ProjectEditController);

	ProjectEditController.$inject = ['UserService', 'ProjectService', 'UserSession', '$state', '$stateParams'];

	function ProjectEditController(UserService, ProjectService, UserSession, $state, $stateParams){
		var vm = this;

		vm.user = {};

		vm.projectId = $stateParams.projectId;
		vm.project = {};
		vm.guests = [];
		vm.statuses = ['not started', 'in progress', 'completed'];
		vm.save = save;
		vm.compareDate = compareDate;
		vm.cancel = cancel;


		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				getProjectDetails();	
				getGuestsByCompany();
			}
		}

		//////////

		function getProjectDetails(){
			ProjectService.getById(vm.projectId).then(function(data){
				vm.project = data.project;
				vm.project.start_date = new Date(data.project.start_date);
				vm.project.end_date = new Date(data.project.end_date);
			});
		}

		function getGuestsByCompany(){
			UserService.getGuestsByCompany(vm.user.company_id).then(function(data){
				vm.guests = data.users;	
			});
		}

		function save(){
			ProjectService.updateProject(vm.project).then(function(data){
				$state.go('welcome.projects-details', {projectId: vm.project.id});
				window.location.reload();
			});
		}

		function cancel(){
			$state.go('welcome.projects');
		}

		function compareDate(form){
			form.start_date.$setValidity("validDate", true);
			if(vm.project.start_date != '' && vm.project.end_date != ''){
				if(vm.project.start_date >= vm.project.end_date){
					form.start_date.$setValidity("validDate", false);
				}
			}
		}

	}

})();