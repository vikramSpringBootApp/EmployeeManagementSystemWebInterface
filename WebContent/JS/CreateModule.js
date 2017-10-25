angular.module("createModule",[])
					.controller("createController", function($scope) {
						$scope.message = "in createModule";
						$scope.addEmployee = function(){
							alert("called");
						}
					});