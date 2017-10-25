
var app = angular.module("Demo", ["ngRoute"])
				.config(function($routeProvider){
					$routeProvider
					.when("/home", {
						templateUrl: "Pages/Home.html",
						controller: "homeController"						
					})
					.when("/create", {
						templateUrl: "Pages/Create.html",
						controller: "createController"
					})
					.when("/display",{
						templateUrl: "Pages/Display.html",
						controller: "displayController",
						controllerAs: "displayCtrl",
						resolve: {
							displayEmployeeLists : function($http){
								return $http.get("http://localhost:8060/employee/HomePage/listallemployee")
								.then(function(response){
									return response.data;
								});
							}
						}
					})
					.when("/update",{
						templateUrl: "Pages/Search.html",
						controller: "searchController"
					})
					.when("/employee/:empid",{
						templateUrl: "Pages/DisplayEmployee.html",
						controller: "displayEmployeeController"
					})
					.otherwise({
						redirectTo : "/home"
					})
				}).controller("homeController", function($scope) {
					$scope.message = "Employee Management System Home Page";
					
				})
				.controller("createController", function($scope) {
					$scope.message = "in createcontroller";
					
					$scope.addEmployee = function(){
						alert("called");
					}
				})
		        .controller("displayController", function(displayEmployeeLists,$route,$scope) {
					var vm = this;
					
					$scope.$on("$locationChangeStart",function(event,next,current){
						if(!confirm("Are you sure you want to Go back"+next)){
							event.preventDefault();
						}
					});
					 var successCallBack = function(response){
						   $scope.employees = response.data;
						   $log.info(response);
					   }
					   
					   var errorCallback = function(reason){
						   $scope.error = reason.data;
						   $log.info(reason);
					   }
					vm.reload = function(){
						$route.reload();
					}
					vm.employees = displayEmployeeLists;
				
				})
				.controller("displayEmployeeController", function($scope,$http,$routeParams) {
					
					 var successCallBack = function(response){
						   $scope.employees = response.data;
						   $log.info(response);
					   }
					   
					   var errorCallback = function(reason){
						   $scope.error = reason.data;
						   $log.info(reason);
					   }
					
					$http({
						url:"http://localhost:8060/employee/HomePage/searchEmployee/"+$routeParams.empid,
						method:"get"
						
					}).then(function(response){
						$scope.employee = response.data;
					});
				})
				.controller("searchController", function($scope) {
					$scope.message1 = "Search & Update";
				});
				
			