(function(){
	'use strict';

	angular
		.module('app')
		.controller('TopnavController', TopnavController);

	TopnavController.$inject = ['UserSession'];

	function TopnavController(UserSession){
		var vm = this;

		vm.logout = logout;

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
			}
		}

		//////////

		function logout(){
			UserSession.clearUser();
		};
	}

})();