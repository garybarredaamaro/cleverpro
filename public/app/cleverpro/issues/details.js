(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('IssueDetailsController', IssueDetailsController);

	IssueDetailsController.$inject = ['UserService', 'IssueService', 'UserSession', '$state', '$stateParams'];

	function IssueDetailsController(UserService, IssueService, UserSession, $state, $stateParams){
		var vm = this;

		vm.user = {};

		vm.issueId = $stateParams.issueId;
		vm.issue = {};

		vm.developer = '';
		vm.reporter = '';

		vm.showInProgress = showInProgress;
		vm.showClose = showClose;
		vm.showForVerification = showForVerification;
		vm.showForRework = showForRework;
		vm.showDeferred = showDeferred;

		vm.changeStatusTo = changeStatusTo;

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
				getNames();
			});
		}

		function getNames(){
		
			UserService.getById(vm.issue.developer_id).then(function(data){
				vm.developer = data.user.first_name + ' ' + data.user.last_name;
			});

			UserService.getById(vm.issue.reporter_id).then(function(data){
				vm.reporter = data.user.first_name + ' ' + data.user.last_name;
			});
		}

		function showInProgress(){

			if((vm.user.user_type_id == 4) 
				|| (vm.user.user_type_id == 6) 
				|| (vm.user.user_type_id == 2) 
				){

				if((vm.issue.status == 'New') 
					|| (vm.issue.status == 'For Rework') ){
					return true;
				}
			}

			return false;
		}

		function showClose(){
			if((vm.user.user_type_id == 5) 
				|| (vm.user.user_type_id == 7) 
				|| (vm.user.user_type_id == 2) 
				){

				if((vm.issue.status == 'For Verification')){
					return true;
				}
			}

			return false;
		}

		function showForVerification(){
			if((vm.user.user_type_id == 4) 
				|| (vm.user.user_type_id == 6) 
				|| (vm.user.user_type_id == 2) 
				){

				if((vm.issue.status == 'In Progress')){
					return true;
				}
			}

			return false;
		}

		function showForRework(){
			if((vm.user.user_type_id == 5) 
				|| (vm.user.user_type_id == 7) 
				|| (vm.user.user_type_id == 2) 
				){

				if((vm.issue.status == 'For Verification')){
					return true;
				}
			}

			return false;
		}

		function showDeferred(){
			if((vm.user.user_type_id == 4) 
				|| (vm.user.user_type_id == 6) 
				|| (vm.user.user_type_id == 2) 
				){

				if((vm.issue.status == 'New')){
					return true;
				}
			}

			return false;
		}

		function changeStatusTo(newStatus){
			vm.issue.status = newStatus;

			IssueService.updateIssue(vm.issue).then(function(data){
			});
			
		}
	}

})();