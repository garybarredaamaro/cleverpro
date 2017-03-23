(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('ProjectMemberController', ProjectMemberController);

	ProjectMemberController.$inject = ['UserService', 'UserSession', 'ProjectService', '$stateParams', '$state'];

	function ProjectMemberController(UserService, UserSession, ProjectService, $stateParams, $state){
		var vm = this;

		vm.user = {};
		vm.projectId = $stateParams.projectId;
		vm.memberId = 0;
		vm.addMember = addMember;
		vm.deleteMember = deleteMember;
		vm.showAddMember = showAddMember;
		vm.showRemoveMember = showRemoveMember;

		vm.selectedUser = {};
		vm.error = null;
		vm.error1 = null;
		vm.users = [];
		vm.members = [];
		vm.project = {};
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
				
				getByProject();
				getByCompany();
			}
		}

		//////////

		function getByProject(){
			UserService.getByProject(vm.projectId).then(function(data){
				vm.members = data.project_users;
				console.log(vm.members);
			});
		}

		function getByCompany(){
			UserService.getAvailableUsersByCompany(vm.user.company_id).then(function(data){
				vm.users = data.users;
			});
		}

		function addMember(){
			ProjectService.newMember(vm.projectId, vm.memberId).then(function(data){
				if(data.exists){
					alert('User already a member.');
				}else{
					$state.reload();
				}
			});
		}

		function deleteMember(user){
			var ans = confirm('Are you sure to remove ' + user.last_name + ', ' + user.first_name + ' from the project?');
			if(ans){
				if(user.user_type_id == 8){
					console.log(user.user_type_id,'OY! SI PM KO >.< KULATAHON TAKA RON!')
					vm.error = 'Oops! You cannot delete the Project Manager.';
				}else if(user.user_type_id == 2){
					console.log(user.user_type_id,'Are you crazy? I said you cannot delete yourse')
					vm.error = 'ERROR: You cannot delete yourself!';
				}else{
					vm.error1 = 'PWEDE NKO NIMO DELETON';
					ProjectService.deleteMember(vm.projectId, user.id).then(function(data){
					console.log(user.user_type_id,'PWEDE NKO NIMO DELETON')	
					if(data.deleted){
						$state.reload();
					}
					// }else{
					// 	console.log(data);
					// }
				});
				}
				
			}

				
		}

		function showAddMember(){
			if((vm.user.user_type_id == 8) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}

		function showRemoveMember(){
			if((vm.user.user_type_id == 8) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}
	}

})();