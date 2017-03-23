(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('HowtoController', HowtoController);

	HowtoController.$inject = ['IssueService', 'UserService', 'UserSession', 'ProjectService', '$stateParams', '$state'];

	function HowtoController(IssueService, UserService, UserSession, ProjectService, $stateParams, $state){
		var vm = this;

		vm.user = {};
		vm.myFunction = myFunction;
		
		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
		
			}
		}

		//////////
		
		function myFunction(id) {
		    var x = document.getElementById(id);
		    if (x.className.indexOf("w3-show") == -1) {
		        x.className += " w3-show";
		    } else { 
		        x.className = x.className.replace(" w3-show", "");
		    }
		}
	}

})();