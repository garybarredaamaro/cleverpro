(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('UserProfileController', UserProfileController);

	UserProfileController.$inject = ['UserService', 'UserSession', '$state', '$stateParams'];

	function UserProfileController(UserService, UserSession, $state, $stateParams){
		var vm = this;

		vm.user = {};
		vm.edit_user = {};

		vm.user_types = [];
		vm.updateUser = updateUser;

		vm.validUserType = validUserType;
		
		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();

				UserService.getById(vm.user.id).then(function(data){
					vm.edit_user = data.user;
					vm.edit_user.password = null;
				});
				
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
				alert('user updated successfully');
				$state.reload();
			}, function(error){
				alert(error);
			});
		}

		function validUserType(user_type){
			return (user_type.id !== 1) && (user_type.id !== 2);
		}

	}

})();