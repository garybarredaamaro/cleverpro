(function(){
	'use strict';

	angular
		.module('app.config', ['ui.router'])
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider){
		var URL = {
			TEMPLATES: './app/templates/',
			COMPONENTS: './app/templates/components/',
			CLEVERPRO: './app/cleverpro/'
		};

		$urlRouterProvider.otherwise('/auth');

		$stateProvider
			.state('home', {
				url: '/auth',
				views: {
					'': {templateUrl: URL.TEMPLATES + 'auth.html'},
					'@home': {templateUrl: URL.COMPONENTS + 'wallpaper.html'},
					'sidenav@home' : {templateUrl: URL.COMPONENTS + 'sidenav.html', controller: 'SidenavController', controllerAs: 'vm'}
				}
			})
			.state('home.signup', {
				url: '/signup',
				templateUrl: URL.CLEVERPRO + 'auth/signup.html',
				controller: 'SignupController',
				controllerAs: 'vm'
			})
			.state('home.login', {
				url: '/login',
				templateUrl: URL.CLEVERPRO + 'auth/login.html',
				controller: 'LoginController',
				controllerAs: 'vm'
			})
			.state('welcome', {
				url: '/',
				views: {
					'': {templateUrl: URL.TEMPLATES + 'user.html'},
					'@welcome': {templateUrl: URL.COMPONENTS + 'wallpaper.html'},
					'sidenav@welcome': {templateUrl: URL.COMPONENTS + 'sidenav.html', controller: 'SidenavController', controllerAs: 'vm'}
				}
			})
			.state('welcome.users', {
				url: 'users',
				templateUrl: URL.CLEVERPRO + 'users/home.html',
				controller: 'UserController',
				controllerAs: 'vm'
			})
			.state('welcome.users-add', {
				url: 'users/add',
				templateUrl: URL.CLEVERPRO + 'users/add.html',
				controller: 'UserAddController',
				controllerAs: 'vm'
			})
			.state('welcome.users-details', {
				url: 'users/:userId/details',
				templateUrl: URL.CLEVERPRO + 'users/details.html',
				controller: 'UserDetailsController',
				controllerAs: 'vm'
			})
			.state('welcome.users-edit', {
				url: 'users/:userId/edit',
				templateUrl: URL.CLEVERPRO + 'users/edit.html',
				controller: 'UserEditController',
				controllerAs: 'vm'
			})
			.state('welcome.projects', {
				url: 'projects',
				templateUrl: URL.CLEVERPRO + 'projects/home.html',
				controller: 'ProjectController',
				controllerAs: 'vm'
			})
			.state('welcome.projects-add', {
				url: 'projects/add',
				templateUrl: URL.CLEVERPRO + 'projects/add.html',
				controller: 'ProjectAddController',
				controllerAs: 'vm'
			})
			.state('welcome.projects-edit', {
				url: 'projects/:projectId/edit',
				templateUrl: URL.CLEVERPRO + 'projects/edit.html',
				controller: 'ProjectEditController',
				controllerAs: 'vm'
			})
			.state('welcome.projects-details', {
				url: 'projects/:projectId/details',
				templateUrl: URL.CLEVERPRO + 'projects/details.html',
				controller: 'ProjectDetailsController',
				controllerAs: 'vm'
			})
			.state('welcome.projects-progress', {
				url: 'projects/:projectId/progress',
				templateUrl: URL.CLEVERPRO + 'projects/progress.html',
				controller: 'ProjectProgressController',
				controllerAs: 'vm'
			})
			.state('welcome.projects-members', {
				url: 'projects/:projectId/members',
				templateUrl: URL.CLEVERPRO + 'project_members/home.html',
				controller: 'ProjectMemberController',
				controllerAs: 'vm'
			})
			.state('welcome.users-projects', {
				url: 'users/:userId/projects',
				templateUrl: URL.CLEVERPRO + 'projects/home.html',
				controller: 'ProjectController',
				controllerAs: 'vm'
			})
			.state('welcome.modules', {
				url: 'projects/:projectId/modules',
				templateUrl: URL.CLEVERPRO + 'modules/home.html',
				controller: 'ModuleController',
				controllerAs: 'vm'
			})
			.state('welcome.modules-add', {
				url: 'projects/:projectId/modules/add',
				templateUrl: URL.CLEVERPRO + 'modules/add.html',
				controller: 'ModuleAddController',
				controllerAs: 'vm'
			})
			.state('welcome.modules-details', {
				url: 'modules/:moduleId/details',
				templateUrl: URL.CLEVERPRO + 'modules/details.html',
				controller: 'ModuleDetailsController',
				controllerAs: 'vm'
			})
			.state('welcome.modules-progress', {
				url: 'modules/:moduleId/progress',
				templateUrl: URL.CLEVERPRO + 'modules/progress.html',
				controller: 'ModuleProgressController',
				controllerAs: 'vm'
			})
			.state('welcome.modules-edit', {
				url: 'modules/:moduleId/edit',
				templateUrl: URL.CLEVERPRO + 'modules/edit.html',
				controller: 'ModuleEditController',
				controllerAs: 'vm'
			})
			.state('welcome.tasks', {
				url: 'modules/:moduleId/tasks',
				templateUrl: URL.CLEVERPRO + 'tasks/home.html',
				controller: 'TaskController',
				controllerAs: 'vm'
			})
			.state('welcome.tasks-add', {
				url: 'modules/:moduleId/tasks/add',
				templateUrl: URL.CLEVERPRO + 'tasks/add.html',
				controller: 'TaskAddController',
				controllerAs: 'vm'
			})
			.state('welcome.tasks-details', {
				url: 'tasks/:taskId/details',
				templateUrl: URL.CLEVERPRO + 'tasks/details.html',
				controller: 'TaskDetailsController',
				controllerAs: 'vm'
			})
			.state('welcome.tasks-edit', {
				url: 'tasks/:taskId/edit',
				templateUrl: URL.CLEVERPRO + 'tasks/edit.html',
				controller: 'TaskEditController',
				controllerAs: 'vm'
			})
			.state('welcome.issues', {
				url: 'projects/:projectId/issues',
				templateUrl: URL.CLEVERPRO + 'issues/home.html',
				controller: 'IssueController',
				controllerAs: 'vm'
			})
			.state('welcome.issues-add', {
				url: 'projects/:projectId/issues/add',
				templateUrl: URL.CLEVERPRO + 'issues/add.html',
				controller: 'IssueAddController',
				controllerAs: 'vm'
			})
			.state('welcome.issues-details', {
				url: 'issues/:issueId/details',
				templateUrl: URL.CLEVERPRO + 'issues/details.html',
				controller: 'IssueDetailsController',
				controllerAs: 'vm'
			})
			.state('welcome.issues-comments', {
				url: 'issues/:issueId/comments',
				templateUrl: URL.CLEVERPRO + 'issues/comments.html',
				controller: 'IssueCommentsController',
				controllerAs: 'vm'
			})
			.state('welcome.issues-edit', {
				url: 'issues/:issueId/edit',
				templateUrl: URL.CLEVERPRO + 'issues/edit.html',
				controller: 'IssueEditController',
				controllerAs: 'vm'
			})
			.state('welcome.mytasks', {
				url: 'mytasks',
				templateUrl: URL.CLEVERPRO + 'tasks/home.html',
				controller: 'TaskController',
				controllerAs: 'vm'
			})
			.state('welcome.myissues', {
				url: 'myissues',
				templateUrl: URL.CLEVERPRO + 'issues/home.html',
				controller: 'IssueController',
				controllerAs: 'vm'
			})
			.state('welcome.myprofile', {
				url: 'myprofile',
				templateUrl: URL.CLEVERPRO + 'users/profile.html',
				controller: 'UserProfileController',
				controllerAs: 'vm'
			})
			.state('home.aboutthecompany', {
				url: 'aboutthecompany',
				templateUrl: URL.CLEVERPRO + 'companies/home.html',
				controller: 'CompanyController',
				controllerAs: 'vm'
			})
			.state('home.howto', {
				url: 'howto',
				templateUrl: URL.CLEVERPRO + 'howto/home.html',
				controller: 'HowtoController',
				controllerAs: 'vm'
			})
			.state('welcome.test', {
				url: 'test',
				templateUrl: URL.CLEVERPRO + 'test/home.html',
				controller: 'TestController',
				controllerAs: 'vm'
			})
			.state('home.aboutthecompany-edit', {
				url: 'aboutthecompany/edit',
				templateUrl: URL.CLEVERPRO + 'companies/edit.html',
				controller: 'CompanyEditController',
				controllerAs: 'vm'
			});
	}
})();