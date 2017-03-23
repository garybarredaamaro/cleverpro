(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('IssueAddController', IssueAddController);

	IssueAddController.$inject = ['IssueService', 'UserService', 'UserSession', 'ProjectService', '$stateParams', '$state'];

	function IssueAddController(IssueService, UserService, UserSession, ProjectService, $stateParams, $state){
		var vm = this;

		vm.user = {};
		vm.projectId = $stateParams.projectId;

		vm.issue = {
			project_id: 0,
			title: '',
			description: '',
			reporter_id: 0,
			developer_id: 0,
			priority: '',
			severity: ''
		};

		vm.project = {};

		vm.add = add;
		vm.developers = [];
		vm.testers = [];
		vm.priorities = ['Highest', 'High', 'Low', 'Lowest'];
		vm.severities = ['blocking', 'critical', 'urgent', 'medium', 'minor'];
		vm.issue_types = ['Bug', 'Improvement', 'Task', 'New Feature'];

		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				
				ProjectService.getById(vm.projectId).then(function(data){
					if(data.project){
						vm.project = data.project;
						vm.issue.reporter_id = vm.user.id;
						getDevelopersByCompany();
						getTestersByCompany();
					}else{
						alert('No Project with id ' + vm.projectId);
						$state.go('welcome.projects');
					}
					
				});
			}
		}

		//////////
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

		function add(){
			vm.issue.project_id = vm.project.id;
			IssueService.addIssue(vm.issue).then(function(data){
				$state.reload();
				vm.error = 'Generated issue id: ' + data.issue.issue_id;
				window.location.reload();
			});
		}
		function cancel(){
			$state.go('welcome.tasks',{moduleId:vm.moduleId});
		}
	}

})();