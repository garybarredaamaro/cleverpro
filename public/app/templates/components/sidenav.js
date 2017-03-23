(function(){
	'use strict';

	angular
		.module('app')
		.controller('SidenavController', SidenavController);

	SidenavController.$inject = ['UserSession', '$state'];

	function SidenavController(UserSession, $state){
		var vm = this;

		vm.logout = logout;
		vm.isUserLoggedin = isUserLoggedin;
		vm.showUsers = showUsers;
		vm.showMyTasks = showMyTasks;
		vm.showMyIssues = showMyIssues;

		activate();

		function activate(){
			if(UserSession.getUser()){
				
				if(UserSession.getUser()){
					vm.user = UserSession.getUser();
				}else{
					$state.go('home');
				}
			}
		}

		//////////

		function logout(){
			UserSession.clearUser();
			$state.reload();
		}

		function isUserLoggedin() {
			if(vm.user){
				return true;
			}
			return false;
		}

		function showUsers(){
			if(vm.user.user_type_id == 2){
				return true;
			}

			return false;
		}

		function showMyTasks(){
			if((vm.user.user_type_id == 4) || (vm.user.user_type_id == 5) || (vm.user.user_type_id == 6) || (vm.user.user_type_id == 7)){
				return true;
			}
			return false;
		}

		function showMyIssues(){

			if((vm.user.user_type_id == 4) || (vm.user.user_type_id == 5) || (vm.user.user_type_id == 6) || (vm.user.user_type_id == 7)){
				return true;
			}
			return false;
		}
	}

})();