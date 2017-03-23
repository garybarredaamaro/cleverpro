(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('IssueEditController', IssueEditController);

	IssueEditController.$inject = ['UserService', 'IssueService', 'UserSession', '$state', '$stateParams'];

	function IssueEditController(UserService, IssueService, UserSession, $state, $stateParams){
		var vm = this;

		vm.user = {};

		vm.issueId = $stateParams.issueId;
		vm.issue = {};
		vm.developers = [];
		vm.testers = [];
		vm.priorities = ['Highest', 'High', 'Low', 'Lowest'];
		vm.severities = ['blocking', 'critical', 'urgent', 'medium', 'minor'];
		vm.issue_types = ['Bug', 'Improvement', 'Task', 'New Feature'];
		vm.statuses = [];
		vm.edit = edit;

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();

				getIssueDetails();	
				getDevelopersByCompany();
				getTestersByCompany();
				
				
			}
		}

		//////////

		function getIssueDetails(){
			IssueService.getById(vm.issueId).then(function(data){
				vm.issue = data.issue;

				setStatuses();
			});
		}

		function getDevelopersByCompany(){
			UserService.getDevelopersByCompany(vm.user.company_id).then(function(data){
				vm.developers = data.users;
			});
		}

		function getTestersByCompany(){
			UserService.getTestersByCompany(vm.user.company_id).then(function(data){
				vm.testers = data.users;
			});
		}

		function edit(){
			IssueService.updateIssue(vm.issue).then(function(data){
				$state.go('welcome.issues-details', {issueId: vm.issue.id});
				window.location.reload();
			});
		}

		function setStatuses(){
			if((vm.user.user_type_id == 4) 
				|| (vm.user.user_type_id == 6) 
				|| (vm.user.user_type_id == 2) 
				){

				if((vm.issue.status == 'New')){
					vm.statuses.push('New');
					vm.statuses.push('New Deferred');
					vm.statuses.push('In Progress');
				}

				if(vm.issue.status == 'For Rework'){
					vm.statuses.push('For Rework');
					vm.statuses.push('In Progress');
				}

				if(vm.issue.status == 'In Progress'){
					vm.statuses.push('In Progress');
					vm.statuses.push('For Verification');
				}
			}

			if((vm.user.user_type_id == 5) 
				|| (vm.user.user_type_id == 7) 
				|| (vm.user.user_type_id == 2) 
				){

				if((vm.issue.status == 'For Verification')){
					vm.statuses.push('For Verification');
					vm.statuses.push('For Rework');
					vm.statuses.push('Closed');
				}

				if((vm.issue.status == 'Closed')){
					vm.statuses.push('Closed');
				}

			}
			
		}

		function cancel(){
			$state.go('welcome.tasks');
		}
	}

})();