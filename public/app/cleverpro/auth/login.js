(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['AuthService', 'UserService', 'UserSession', '$state'];

	function LoginController(AuthService, UserService, UserSession, $state){
		var vm = this;

		vm.error = null;

		vm.login = login;

		vm.user = {
			email: '',
			password: ''
		};

		activate();

		function activate(){
			if(UserSession.getUser()){
				$state.go('welcome');
			}
		}

		////////

		function login(){
			AuthService.login(vm.user).then(function(data){
				if(data.user){
					UserSession.setUser(data.user);
					$state.go('welcome');
				}else{
					vm.error = 'Incorrect email or password.';
					//todo:: delay five seconds then clear error variable
					//todo:: it is important to bring this error message in the back-end
				}
			});
			
		}
	}

})();