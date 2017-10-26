
var app = angular.module("Demo", ["ngRoute"])
				.config(function($routeProvider,$httpProvider){
					/*$httpProvider.defaults.headers.common = {};
					  $httpProvider.defaults.headers.post = {};
					  $httpProvider.defaults.headers.put = {};
					  $httpProvider.defaults.headers.patch = {};*/
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
				})
				/*.factory("employeeService", [ '$http', function($http){
					var fac = {};
					
					fac.AddEmployeeToDB = function(Employee){
						$http.post("http://localhost:8060/employee/HomePage/createEmployee",Employee).success(function(response) {
							alert(response.status);
						})
						
						$http({
						    method : "POST",
						    url : "http://localhost:8060/employee/HomePage/createEmployee",
						    data : Employee,
						    headers : {
						        'Content-Type' : 'application/json'
						    }
						}).then(function(response){
							alert(response.status);
						});
					}
					return fac;
				}])			*/	
				.controller("homeController", function($scope) {
					$scope.message = "Employee Management System Home Page";
					
				})
				.controller("createController", function($scope,$http) {
					$scope.message = "in createcontroller";
					
					$scope.addEmployee = function(){
						
						/*fac.AddEmployeeToDB = function(){
							$http.post("http://localhost:8060/employee/HomePage/createEmployee",$scope.Employee).success(function(response) {
								alert(response.status);
							})
						}*/
						var employee1 = {
								address: "Hinjiwadi Chowk",
								certificateName: "AWS",
								contactNo: "9763259803",
								dob: "31-08-1993",
								empId: 132,
								firstName: "Ambuj",
								lastName: "Dubey",
								percentage: 96,
								position: "software Engg"
							};

						$http({
						    method : "POST",
						    url : "http://localhost:8060/employee/HomePage/createEmployee",
						    data : angular.toJson($scope.Employee),
						    headers : {
						        'Content-Type' : 'application/json'
						    }
						}).then(function(response){
							alert(response.status);
						});
						
						

						/*var objJson = angular.toJson($scope.Employee);
						//alert(objJson);
						employeeService.AddEmployeeToDB(employee1);*/
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
				/*.factory("employeeService", [ '$http', function($http){
					var fac = {};
					
					fac.AddEmployeeToDB = function(Employee){
						$http.post("http://localhost:8060/employee/HomePage/createEmployee",Employee).success(function(response) {
							alert(response.status);
						})
					}
					
				}])*/
				
			