(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('SignupController', SignupController);

	SignupController.$inject = ['UserSession', 'AuthService', '$state'];

	function SignupController(UserSession, AuthService, $state){
		var vm = this;

		vm.error = null;

		vm.signup = signup;

		vm.owner = {
			first_name: '',
			last_name: '',
			email: '',
			cp_number: '',
			password: '',
			name: '',
			description: ''
		};

		activate();

		function activate(){
			
		}

		//////////

		function signup(){
			AuthService.signup(vm.owner).then(function(data){
				if(data.user){
					UserSession.setUser(data.user);
					alert('Welcome to CleverPro');
					$state.go('welcome');
				}else{
					vm.error = 'Something wrong happened.';

				}
			});
			
		}
	}
})();