(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('UserEditController', UserEditController);

	UserEditController.$inject = ['UserService', 'UserSession', '$state', '$stateParams'];

	function UserEditController(UserService, UserSession, $state, $stateParams){
		var vm = this;

		vm.user = {};
		vm.edit_user = {};

		vm.user_types = [];
		vm.updateUser = updateUser;
		vm.cancel = cancel;

		vm.validUserType = validUserType;
		
		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();


				if($stateParams.userId){
					UserService.getById($stateParams.userId).then(function(data){
						vm.edit_user = data.user;
					});
				}

				getUserTypes();
			}
		}

		//////////


		function getUserTypes(){
			UserService.getUserTypes().then(function(data){
				if(vm.user.user_type_id == 2){
					vm.user_types = data.user_types;
				}
			});
		}

		function updateUser(){
			UserService.updateUser(vm.edit_user).then(function(data){
				$state.go('welcome.users-details', {userId: vm.edit_user.id});
				window.location.reload();
			}, function(error){
				alert(error);
			});
		}

		function cancel(){
			$state.go('welcome.users');
		}

		function validUserType(user_type){
			return (user_type.id !== 1) && (user_type.id !== 2);
		}

	}

})();