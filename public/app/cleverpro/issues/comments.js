(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('IssueCommentsController', IssueCommentsController);

	IssueCommentsController.$inject = ['UserService', 'IssueService', 'UserSession', '$state', '$stateParams'];

	function IssueCommentsController(UserService, IssueService, UserSession, $state, $stateParams){
		var vm = this;

		vm.user = {};

		vm.issueId = $stateParams.issueId;
		vm.issue = {};
		vm.comment = {
			
		};

		vm.showAddComment = showAddComment;

		vm.comments = [
						{id: 1, name: 'Gary Amaro', user_type: 'Owner', date: 'Jan 21, 2017', message: 'this is a message'},
						{id: 1, name: 'Gary Amaro', user_type: 'Owner', date: 'Jan 21, 2017', message: 'this is a message'}
					  ];

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				getIssueDetails();	
				
			}
		}

		//////////

		function getIssueDetails(){
			IssueService.getById(vm.issueId).then(function(data){
				vm.issue = data.issue;	
			});
		}

		function showAddComment(){
			return true;
		}
	}

})();