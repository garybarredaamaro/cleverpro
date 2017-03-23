(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('IssueController', IssueController);

	IssueController.$inject = ['IssueService', 'UserSession', 'ProjectService', '$stateParams', '$state'];

	function IssueController(IssueService, UserSession, ProjectService, $stateParams, $state){
		var vm = this;

		vm.user = {};
		vm.issues = [];
		vm.project = {};

		vm.statuses = ['New', 'In Progress', 'For Verification', 'For Rework', 'Closed', 'Deferred'];
		
		vm.showAddIssue = showAddIssue;
		vm.showRemoveIssue = showRemoveIssue;
		vm.showEditIssue = showEditIssue;

		vm.deleteIssue = deleteIssue;

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				if($stateParams.projectId){
					vm.projectId = $stateParams.projectId;
					ProjectService.getById(vm.projectId).then(function(data){
						if(data.project){
							vm.project = data.project;
						}else{
							alert('No Project with id ' + vm.projectId);
							$state.go('welcome.projects');
						}
						
					});
					getIssuesByProject(vm.projectId);
				}else{
					getIssuesByUser(vm.user.id);
				}
				
				
				
			}
		}

		//////////

		function getIssuesByProject(id){
			IssueService.getByProject(id).then(function(data){
				vm.issues = data.issues;
			});
		}

		function getIssuesByUser(id){
			IssueService.getByUser(id).then(function(data){
				vm.issues = data.issues;
			});
		}

		function showAddIssue(){
			if((vm.user.user_type_id == 5) || (vm.user.user_type_id == 7) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}

		function showRemoveIssue(){
			if((vm.user.user_type_id == 5) || (vm.user.user_type_id == 7) || (vm.user.user_type_id == 2)){
				return true;
			}
			return false;
		}

		function showEditIssue(){
			if((vm.user.user_type_id == 5) || (vm.user.user_type_id == 7) || (vm.user.user_type_id == 2) || (vm.user.user_type_id == 4) || (vm.user.user_type_id == 6)){
				return true;
			}
			return false;
		}

		function deleteIssue(issue){
			var ans = confirm('Are you sure to delete ' + issue.title + '?');
			if(ans){
				IssueService.deleteIssue(issue.id).then(function(data){
					$state.reload();
				});
			}
		}

	}

})();