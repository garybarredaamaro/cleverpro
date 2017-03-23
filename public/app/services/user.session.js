(function(){
	'use strict';

	angular
		.module('app.services')
		.factory('UserSession', UserSession);

	UserSession.$inject = ['$cookies', '$state'];

	function UserSession($cookies, $state){
		var service = {
			setUser: setUser,
			getUser: getUser,
			clearUser: clearUser
		};

		return service;

		//////////

		function setUser(user){
			$cookies.putObject('user', user);
		}

		function getUser(){
			if($cookies.getObject('user')){
				return $cookies.getObject('user');
			}
			$state.go('home.login');
		}

		function clearUser(){
			$cookies.remove('user');
		}
	}
})();