var myApp = angular.module("myModule",[])
				   .controller("myController",function($scope,$http,$log){
					   
					   
					   var successCallBack = function(response){
						   $scope.employees = response.data;
						   $log.info(response);
					   }
					   
					   var errorCallback = function(reason){
						   $scope.error = reason.data;
						   $log.info(reason);
					   }
					   
					   $http.get("http://localhost:8060/employee/HomePage/listallemployee")
					   .then(successCallBack,errorCallback);
					   
					   $scope.search = function(item){
						   if( $scope.searchText == undefined){
							   return true;
						   }
						   else{
							   if(item.firstName.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 ||
										item.address.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1){
								   return true;
							   }
						   }
						   return false;
					   }
				   });
