(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('ProjectAddController', ProjectAddController);

	ProjectAddController.$inject = ['UserService', 'ProjectService', 'UserSession', '$state'];

	function ProjectAddController(UserService, ProjectService, UserSession, $state){
		var vm = this;

		vm.user = {};
		vm.addProject = addProject;
		vm.compareDate = compareDate;
		vm.cancel = cancel;
		vm.cancel = cancel;
		vm.compareDate = compareDate;

		vm.new_project = {
			title: '',
			description: '',
			start_date: '',
			end_date: '',
			project_manager_id: 0,
			guest_id: null,
			company_id: 0

		};

		vm.guests = [];

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				getGuestsByCompany();
			
			}
		}

		//////////

		function getGuestsByCompany(){
			UserService.getGuestsByCompany(vm.user.company_id).then(function(data){
				vm.guests = data.users;	
			});
		}

		function addProject(){
			vm.new_project.company_id = vm.user.company_id;
			vm.new_project.project_manager_id = vm.user.id;

			ProjectService.addProject(vm.new_project).then(function(data){
				$state.go('welcome.projects')
			window.location.reload();
			});
		}

		function compareDate(form){
			form.start_date.$setValidity("validDate", true);
			if(vm.new_project.start_date != '' && vm.new_project.end_date != ''){
				if(vm.new_project.start_date >= vm.new_project.end_date){
					form.start_date.$setValidity("validDate", false);
				}
			}
		}

		function cancel(){
			$state.go('welcome.projects');
		}
	}

})();