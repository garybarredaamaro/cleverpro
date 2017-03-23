(function(){
	'use strict';

	angular
		.module('app.cleverpro')
		.controller('ModuleProgressController', ModuleProgressController);

	ModuleProgressController.$inject = ['ModuleService', 'UserSession', '$stateParams'];

	function ModuleProgressController(ModuleService, UserSession, $stateParams){
		var vm = this;
	      
		vm.user = {};
		vm.moduleId = $stateParams.moduleId;
		vm.progress = [];

		vm.getProgress = getProgress;
		vm.tasks = [];
		vm.chart_tasks = [];
		vm.chart_progress = [];
		activate();

		function activate(){
			if(UserSession.getUser()){
				vm.user = UserSession.getUser();
				getProgress(vm.moduleId);
				getModuleDetails();
			}
		}

		//////////

		function getModuleDetails(){
			ModuleService.getById(vm.moduleId).then(function(data){
				vm.module = data.module;
				getTasks();	
			});
		}

		function getTasks(){
			ModuleService.gantt(vm.moduleId).then(function(data){
		      	vm.tasks = data.tasks;
		      	//start chart
		      	google.charts.load('current', {'packages':['gantt', 'corechart'], 'callback': drawCharts});
		      });
		}

		function getProgress(id){
			ModuleService.getProgress(id).then(function(data){
				vm.progress = data.count;
				console.log(vm.progress);
				return vm.progress;
			});
		}
		
		function drawCharts(){
			drawChart();
			drawChart2();
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

		      angular.forEach(vm.tasks, function(value, key, obj){
		      	value.completed = (value.completed == 0)? 0: 100;
		      	value.depends_on = (value.depends_on == null)? null: value.depends_on.toString();
		      	vm.chart_tasks.push([value.id.toString()
		      					, value.title,
		      					value.module_id.toString(), 
		      					new Date(value.start_date), 
		      					new Date(value.end_date), 
		      					null, 
		      					parseInt(value.completed), 
		      					value.depends_on]);
		      });

		      data.addRows(vm.chart_tasks);

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

		      var chart = new google.visualization.Gantt(document.getElementById('module_gantt'));

		      chart.draw(data, options);
		}

		function drawChart2() {
			vm.chart_progress.push(['Status', 'Number']);

			angular.forEach(vm.progress, function(value, key, obj){
		    	vm.chart_progress.push([key, value]);
		    });

	        var data = google.visualization.arrayToDataTable(vm.chart_progress);

	        var options = {
	          //title: 'My Daily Activities',
	          is3D: true,
	        };

	        var chart = new google.visualization.PieChart(document.getElementById('module_piechart_3d'));
	        chart.draw(data, options);
	      }
		
	}

})();