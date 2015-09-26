angular.module('linkspot')

	.factory('Users', ['$scope', function($scope) {
  		var dataRef = new Firebase("https://linkspot.firebaseIO.com/users");
  		var contacts = $firebaseArray(dataRef);
	}])