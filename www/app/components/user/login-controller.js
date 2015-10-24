angular.module('linkspot')
	.controller('LoginController', ['$scope', '$state', 'Users', function($scope, $state, Users) {

		$scope.$on( "$ionicView.enter", function() {
			// When user gets to login page, log the user out.
			document.getElementById('loginUsername').value = "";
			document.getElementById('loginPassword').value = "";
	        var dataRef = Users.getFirebaseRef();
	        dataRef.unauth();
    	});

	    $scope.logIn = function(submittedForm) {

	    	function authHandler(error, authData) {
	            if (error) {
	                alert("Login Failed", error);
	            } else {
	                // alert("Authenticated successfully with payload " + authData.uid 
	                // 	+ " is logged in with " + authData.provider
	                // 	+ " with token " + authData.token
	                // 	+ " and expires on " + authData.expires, authData.uid);

                	Users.setUserId(authData.uid, function(){
                		$state.go('tab.profile');
                	});

	                
	            }
	    	}

	        var ref = new Firebase("https://linkspot.firebaseIO.com/");
	        
	        ref.authWithPassword({
	            "email": submittedForm.email,
	            "password": submittedForm.password  
	        }, authHandler)
	    }



	}]);