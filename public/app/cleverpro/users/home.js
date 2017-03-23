(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('UserController', UserController);

	UserController.$inject = ['UserService', 'ProjectService', 'UserSession', '$stateParams', '$state'];

	function UserController(UserService, ProjectService, UserSession, $stateParams, $state){
		var vm = this;
		vm.project_id = $stateParams.project_id;
		vm.project = {
			project_id:'',
		};
		vm.user = {
			name:'',

		};
		vm.projects = [];
		vm.users = [];
		vm.deleteUser = deleteUser;
		vm.selectedUser = {};
		activate();
		vm.error= null;
		vm.error1= null;
		vm.error2 = null;

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				getUsersByCompany();
				getByProject();
				
			}
		}


		function getUsersByCompany(){
			UserService.getByCompany(vm.user.company_id).then(function(data){
				vm.users = data.users;
			});
		}

		function getByProject(){
			angular.forEach(vm.members , function(item){
				UserService.getByProject(item.id).then(function(data){
					vm.project_id = data.members;
					console.log(vm.project_id);
					return vm.project_id; 
				})
			});
		}

		function deleteUser(user){
			var ans = confirm('Are you sure to delete ' +user.last_name + ', ' + user.first_name + '?');
			ProjectService.getByUser(user.id).then(function(data){
				;
				if(ans){
					if(user.user_type_id == 2){
						console.log(user.user_type_id ,'OWNER KO OY!')
						vm.error = 'YOU CANNOT DELETE YPURSELF';
					}else{
						if (data.projects.length > 0){
							console.log('AYAAAW >.< KAY NAA KOY PROJECTS')
							vm.error2 = 'Warning: User has a project';
						}else{
							vm.error1 = 'User successfully deleted!';
							console.log(user.user_type_id,'PWEDE NKO NIMO DELETEON')
							UserService.deleteUser(user.id).then(function(data){
								$state.reload();
							});	
						}
					}
				}
			});
			
			// console.log(projectsHandled);
			// if (ans){
			// 	if (user.user_type_id == 2){

			// 	}else{
			// 		if (projectsHandled.length > 0){
			// 			alert("NAA KOY PROJECT UI!")
			// 		}else{
			// 			alert("PWEDE KO MADELETE!")
			// 		}
			// 	}
			// }
			// if(ans){
			// 	if(user.user_type_id == 2){
			// 		console.log(user.user_type_id ,'OWNER KO OY!')
			// 		vm.error = 'Sorry but you cannot delete yourself';
			// 	}else{	
			// 		vm.error1 = 'User successfully deleted!';
			// 		console.log(user.user_type_id,'PWEDE NKO NIMO DELETEON')
			// 			UserService.deleteUser(user.id).then(function(data){
			// 			$state.reload();
			// 			});		
					
			// 	}

				
			// }
		}
	}

})();