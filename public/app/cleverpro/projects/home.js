(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['ProjectService', 'UserSession', '$stateParams', '$state'];

	function ProjectController(ProjectService, UserSession, $stateParams, $state){
		var vm = this;

		vm.user = {};
		vm.projects = [];
		vm.project_color = project_color;
		vm.showAddProject = showAddProject;
		vm.deleteProject = deleteProject;
		vm.showEditProject = showEditProject;
		vm.showRemoveProject = showRemoveProject;

		activate();

		function activate(){
			
			if(UserSession.getUser()){

				vm.user = UserSession.getUser();

				if($stateParams.userId){
					getProjectsByUser($stateParams.userId);
				}else{
					getProjectsByUser(vm.user.id);
				}


				
			}
		}

		//////////

		function getProjectsByUser(id){
			vm.loading = true;
			ProjectService.getByUser(id).then(function(data){
				vm.projects = data.projects;
				if(vm.projects.length){
					vm.empty = false;
				}else{
					vm.empty = true;
				}
				vm.loading = false;
			});
		}

		function project_color(status) {
			return 'w3-light-grey';

			if(status == 'not started'){
				return 'w3-pale-red';
			}else if(status == 'in progress'){
				return 'w3-pale-blue';
			}else{
				return 'w3-pale-green';
			}
		}
		

		function deleteProject(project){
			var ans = confirm('Are you sure to delete ' + project.title + '?');
			if(ans){
				ProjectService.deleteProject(project.id).then(function(data){
					$state.reload();
				});
			}
		}

		function showAddProject(){
			if((vm.user.user_type_id == 8) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}

		function showEditProject(){
			if((vm.user.user_type_id == 8) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}

		function showRemoveProject(){
			if((vm.user.user_type_id == 8) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}
	}

})();