(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('ProjectProgressController', ProjectProgressController);

	ProjectProgressController.$inject = ['ProjectService', 'UserSession', '$stateParams'];

	function ProjectProgressController(ProjectService, UserSession, $stateParams){
		var vm = this;
	      
		vm.user = {};
		vm.project = {};
		vm.projectId = $stateParams.projectId;
		vm.progress = [];
		vm.getProgress = getProgress;
		vm.modules = [];
		vm.chart_modules = [];
		vm.chart_progress = [];
		/*sample*/
		vm.module_status = [] ;
		vm.module_progress = []; 
		/*sample*/
		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				getProgress(vm.projectId);
				getProjectDetails();
				
			}
		}

		//////////

		function getProjectDetails(){
			ProjectService.getById(vm.projectId).then(function(data){
				vm.project = data.project;
				getModules();	
			});
		}

		function getModules(){
			ProjectService.gantt(vm.project.id).then(function(data){
		      	vm.modules = data.modules;
		      	getTasks();
		      	//start chart
		      	google.charts.load('current', {'packages':['gantt','corechart'], 'callback': drawCharts});
		      });
		}
		/*sample*/
		function getTasks(){
			angular.forEach(vm.modules , function(item){
				ProjectService.getModuleProgress(item.id).then(function(data){
					vm.module_progress = data.count;
					console.log(vm.module_progress);
					return vm.module_progress; 
				})
			});
			
		} 	
		/***/
		function getProgress(id){
			ProjectService.getProgress(id).then(function(data){
				vm.progress = data.count;
				console.log(vm.progress);
				return vm.progress;
			});
		}
		
		function drawCharts(){
			drawChart();
			drawChart2();
			drawChart3();
		}

	    function drawChart() {

		      var data = new google.visualization.DataTable();
		      data.addColumn('string', 'Task ID');
		      data.addColumn('string', 'Task Name');
		      data.addColumn('string', 'Resource');
		      data.addColumn('date', 'Start Date');
		      data.addColumn('date', 'End Date');
		      data.addColumn('number', 'Duration');
		      data.addColumn('number', 'Percent Complete');
		      data.addColumn('string', 'Dependencies');

		      //modules has no resources but tasks do

		      angular.forEach(vm.modules, function(value, key, obj){
		      	value.percent_completed = (value.percent_completed == null)? 0: value.percent_completed;
		      	value.depends_on = (value.depends_on == null)? null: value.depends_on.toString();
		      	vm.chart_modules.push([value.id.toString()
		      					, value.title,
		      					value.title, 
		      					new Date(value.start_date), 
		      					new Date(value.end_date), 
		      					null, 
		      					parseInt(value.percent_completed), 
		      					value.depends_on]);
		      });

		      data.addRows(vm.chart_modules);

		      var options = {
		        height: 400,
		        gantt: {
		          criticalPathEnabled: false,
		          innerGridHorizLine: {
		            stroke: '#ffe0b2',
		            strokeWidth: 2
		          },
		          innerGridTrack: {fill: '#fff3e0'},
		          innerGridDarkTrack: {fill: '#ffcc80'}
		        }
		      };

		      var chart = new google.visualization.Gantt(document.getElementById('project_gantt'));

		      chart.draw(data, options);
		}

		function drawChart2() {
			vm.chart_progress.push(['Status', 'Number']);
			
			angular.forEach(vm.progress, function(value, key, obj){
		    	vm.chart_progress.push([key, value]);
		    });

		    
	        var data = google.visualization.arrayToDataTable(vm.chart_progress);
	        var options = {
	          // title: 'My Daily Activities',
	          is3D: true,
	        };

	        var chart = new google.visualization.PieChart(document.getElementById('project_piechart_3d'));
	        chart.draw(data, options);
	       
	    }	
	    /*sample */
	    function drawChart3(){
	    	vm.module_status.push(['Status', 'Number']);

	    	angular.forEach(vm.module_progress, function(key, value, obj){
		    	vm.module_status.push([value , key]);
 				var myEl = angular.element( document.querySelector( '#module_chart' ) );
     			myEl.append('<div id="module_piechart_3d" style="width: 300px; height: 150px;"></div>');

 				var data = google.visualization.arrayToDataTable(vm.module_status);

		    	var options = {
	          		// title: 'My Daily Activities',
	          		is3D: true,
	        	};

	        	var chart = new google.visualization.PieChart(document.getElementById('module_piechart_3d'));
	        	chart.draw(data, options);	
		    });

		    
	    }
	}

})();