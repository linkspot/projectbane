angular.module('linkSpot')
	.factory("Contacts", function($firebaseArray) {
		var dataRef = new Firebase("https://linkspot.firebaseIO.com/");
		return $firebaseArray(dataRef);
	});