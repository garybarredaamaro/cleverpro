<!DOCTYPE html> <html data-ng-app="app" ng-strict-di> <head>     <meta
charset="utf-8">     <meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">     <meta
name="description" content="">     <meta name="author" content="">
<title>CLEVERPRO</title>   
 <style>   




  </style>     <!-- <link
rel="stylesheet" href="http://www.w3schools.com/lib/w3.css"> -->     <!--
Latest compiled and minified CSS --> <!-- <link rel="stylesheet"
href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" i
ntegrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEj
h4u" crossorigin="anonymous"> --> <!-- Latest compiled and minified JavaScript <script
src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" inte
grity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa
" crossorigin="anonymous"></script>  -->     <link rel="stylesheet"
type="text/css" href="{{ asset('assets/css/w3.css') }}">     <link
rel="stylesheet" type="text/css" href="{{ asset('assets/css/app.css') }}">
<link rel="stylesheet" type="text/css" href="{{
asset('assets/css/animate.css') }}">     <!-- Bootstrap Core CSS -->    
<link rel="stylesheet" type="text/css" href="{{
asset('assets/css/bootstrap.min.css') }}">  
<link rel="stylesheet"
type="text/css" href="{{ asset('assets/css/bootstrap.css') }}">

<!-- MetisMenu CSS -->

<!-- <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/metisMenu.min.css') }}"> -->

<!-- Custom CSS -->
<!--  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/sb-admin-2.css') }}"> -->

<!-- Morris Charts CSS -->
<!-- <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/morris.css') }}"> -->

<!-- Custom Fonts -->
<!-- <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/font-awesome.min.css') }}"> -->
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/font-awesome.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/app.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/bootsrap-default-them.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/style.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/style-responsive.css') }}">

<!--external css-->
<link rel="stylesheet" type="text/css" href="{{ asset('assets/font-awesome/css/font-awesome.css') }}"/>
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/zabuto_calendar.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('assets/js/gritter/css/jquery.gritter.css') }}"/>
<link rel="stylesheet" type="text/css" href="{{ asset('assets/lineicons/style.css') }}">    
<!-- <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/bootstrap-theme.min.css') }}"/> -->
<!-- Custom styles for this template -->
<link href="assets/css/style.css" rel="stylesheet">
<link href="assets/css/style-responsive.css" rel="stylesheet">


</head>
<body>
<!-- 
<button type="button" class="btn btn-default">Default</button>
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-link">Link</button> 
-->

<section id="container" >
<div ui-view></div>






<script src="{{ asset('assets/js/charts/loader.js') }}"></script>
<!-- Bootstrap Core JavaScript -->
<!-- <script src="{{ asset('assets/js/bootstrap.min.js') }}"></script> -->

<!-- Metis Menu Plugin JavaScript -->
<!-- <script src="{{ asset('assets/js/metisMenu.min.js') }}"></script> -->
<!-- Morris Charts JavaScript -->
<script src="{{ asset('assets/js/raphael.min.js') }}"></script>
<script src="{{ asset('assets/js/morris.min.js') }}"></script>
<script src="{{ asset('assets/js/morris-data.js') }}"></script>
<!-- Custom Theme JavaScript -->
<script src="{{ asset('assets/js/sb-admin-2.min.js') }}"></script>  

<script src="{{ asset('assets/js/angular.min.js') }}"></script>
<script src="{{ asset('assets/js/angular-ui-router.js') }}"></script>
<script src="{{ asset('assets/js/angular-cookies.js') }}"></script>
<script src="{{ asset('assets/js/chart-master/Chart.js') }}"></script>
<!-- <script src="assets/js/jquery.js"></script> -->
<!-- <script src="assets/js/bootstrap.min.js"></script> -->
<script class="include" type="text/javascript" src="assets/js/jquery.dcjqaccordion.2.7.js"></script>
<script src="assets/js/jquery.scrollTo.min.js"></script>
<script src="assets/js/jquery.nicescroll.js" type="text/javascript"></script>


<!--common script for all pages-->
<script src="{{ asset('assets/js/common-scripts.js') }}"></script>

<!--script for this page-->
<script src="{{ asset('assets/js/chart-master/Chart.js') }}"></script>
<script src="{{ asset('assets/js/chartjs-conf.js') }}"></script>


<!-- CleverPro Scripts-->    
<script src="{{ asset('app/app.js') }}"></script>
<script src="{{ asset('app/app.config.js') }}"></script>

<script src="{{ asset('app/services/services.js') }}"></script>
<script src="{{ asset('app/services/user.service.js') }}"></script>
<script src="{{ asset('app/services/project.service.js') }}"></script>
<script src="{{ asset('app/services/module.service.js') }}"></script>
<script src="{{ asset('app/services/task.service.js') }}"></script>
<script src="{{ asset('app/services/issue.service.js') }}"></script>
<script src="{{ asset('app/services/auth.service.js') }}"></script>
<script src="{{ asset('app/services/company.service.js') }}"></script>
<script src="{{ asset('app/services/user.session.js') }}"></script>

<script src="{{ asset('app/templates/components/topnav.js') }}"></script>
<script src="{{ asset('app/templates/components/sidenav.js') }}"></script>

<script src="{{ asset('app/cleverpro/cleverpro.js') }}"></script>

<script src="{{ asset('app/cleverpro/auth/signup.js') }}"></script>
<script src="{{ asset('app/cleverpro/auth/login.js') }}"></script>

<script src="{{ asset('app/cleverpro/users/home.js') }}"></script>
<script src="{{ asset('app/cleverpro/users/add.js') }}"></script>
<script src="{{ asset('app/cleverpro/users/details.js') }}"></script>
<script src="{{ asset('app/cleverpro/users/edit.js') }}"></script>
<script src="{{ asset('app/cleverpro/users/profile.js') }}"></script>

<script src="{{ asset('app/cleverpro/projects/home.js') }}"></script>
<script src="{{ asset('app/cleverpro/projects/add.js') }}"></script>
<script src="{{ asset('app/cleverpro/projects/progress.js') }}"></script>
<script src="{{ asset('app/cleverpro/projects/details.js') }}"></script>
<script src="{{ asset('app/cleverpro/projects/edit.js') }}"></script>

<script src="{{ asset('app/cleverpro/project_members/home.js') }}"></script>

<script src="{{ asset('app/cleverpro/modules/home.js') }}"></script>
<script src="{{ asset('app/cleverpro/modules/add.js') }}"></script>
<script src="{{ asset('app/cleverpro/modules/details.js') }}"></script>
<script src="{{ asset('app/cleverpro/modules/edit.js') }}"></script>

<script src="{{ asset('app/cleverpro/tasks/home.js') }}"></script>
<script src="{{ asset('app/cleverpro/tasks/add.js') }}"></script>
<script src="{{ asset('app/cleverpro/tasks/details.js') }}"></script>
<script src="{{ asset('app/cleverpro/tasks/edit.js') }}"></script>

<script src="{{ asset('app/cleverpro/issues/home.js') }}"></script>
<script src="{{ asset('app/cleverpro/issues/add.js') }}"></script>
<script src="{{ asset('app/cleverpro/issues/details.js') }}"></script>
<script src="{{ asset('app/cleverpro/issues/edit.js') }}"></script>
<script src="{{ asset('app/cleverpro/issues/comments.js') }}"></script>

<script src="{{ asset('app/cleverpro/companies/home.js') }}"></script>
<script src="{{ asset('app/cleverpro/companies/edit.js') }}"></script>

<script src="{{ asset('app/cleverpro/howto/home.js') }}"></script>

<script src="{{ asset('app/cleverpro/test/home.js') }}"></script>

</section>
</body>
</html>
