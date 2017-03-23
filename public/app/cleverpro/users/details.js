(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('UserDetailsController', UserDetailsController);

	UserDetailsController.$inject = ['UserService', 'UserSession', '$state', '$stateParams'];

	function UserDetailsController(UserService, UserSession, $state, $stateParams){
		var vm = this;

		vm.user = {};

		
		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
		
				if($stateParams.userId){
					UserService.getById($stateParams.userId).then(function(data){
						vm.display_user = data.user;
					});
				}
			}
		}

		//////////

	}

})();