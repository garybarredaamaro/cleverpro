(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('UserAddController', UserAddController);

	UserAddController.$inject = ['UserService', 'UserSession', '$state'];

	function UserAddController(UserService, UserSession, $state){
		var vm = this;

		vm.user = {};
		vm.users = [];
		vm.addUser = addUser;
		vm.new_user = {
			first_name: '',
			last_name: '',
			email: '',
			cp_number: '',
			password: '',
			user_type_id: 0,
			company_id: 0

		};

		vm.user_types = [];
		vm.validUserType = validUserType;
		vm.error = null;
		vm.cancel = cancel;

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				getUsersByCompany();
				getUserTypes();
			}
		}

		//////////

		function getUsersByCompany(){
			UserService.getByCompany(vm.user.company_id).then(function(data){
				vm.users = data.users;
			});
		}

		function getUserTypes(){
			UserService.getUserTypes().then(function(data){
				if(vm.user.user_type_id == 2){
					vm.user_types = data.user_types;
				}
			});
		}

		function addUser(){
			vm.new_user.company_id = vm.user.company_id;
			UserService.addUser(vm.new_user).then(function(data){
				// alert('user added successfully');
				$state.go('welcome.users');
				window.location.reload();



			});
		}

		function cancel(){
			$state.go('welcome.users');
		}

		function validUserType(user_type){
			return (user_type.id !== 1) && (user_type.id !== 2);
		}

		var exist = function(uname){
			$scope.userCheck.forEach(function(user){
				console.log(user.email)
				console.log(uname)
				if(user.user.name == uname){
					console.log ('duplicate')
					return  true;
				}else{
					console.log('not duplicate')
					return false;	
				}
			})
		}

	}

})();