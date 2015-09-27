angular.module('linkspot')
	.controller('LoginController', ['$scope', '$state', 'Users', function($scope, $state, Users) {

		$scope.$on( "$ionicView.enter", function() {

	        var dataRef = Users.getFirebaseRef();
	        console.log("FIREBASE REFERENCE = " + dataRef.getAuth().uid);
	        dataRef.unauth();
	        console.log("LOGGED IN USER ID = " + dataRef.getAuth().uid);
    	});

	    $scope.logIn = function(submittedForm) {

	    	function authHandler(error, authData) {
	            if (error) {
	                alert("Login Failed", error);
	            } else {
	                alert("Authenticated successfully with payload " + authData.uid 
	                	+ " is logged in with " + authData.provider
	                	+ " with token " + authData.token
	                	+ " and expires on " + authData.expires, authData.uid);
	                $state.go('tab.profile');
	            }
	    	}

	        var ref = new Firebase("https://linkspot.firebaseIO.com/");
	        
	        ref.authWithPassword({
	            "email": submittedForm.email,
	            "password": submittedForm.password  
	        }, authHandler)
	    }



	}]);