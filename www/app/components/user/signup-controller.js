angular.module('linkspot')
	.controller('SignupController', ['$scope', '$state', 'Users', function($scope, $state, Users) {

		$scope.error = { isLoading: false };
		$scope.errorMessage = "Error";

	    $scope.signUp = function(submittedForm) {

	    	if (submittedForm.password === submittedForm.passwordConfirm) {
	    		// Also add in error check for no fields populated

	    		var email = submittedForm.email
	    		var password = submittedForm.password  
	    		var fullName = submittedForm.fullName;

		    	function authHandler(error, authData) {
		            if (error) {
		                $scope.errorMessage = errorHandler(error.code);
		                $scope.error.isLoading = true;
						$scope.$apply();
		            } else {
		                // alert("Authenticated successfully with payload " + authData.uid, authData.uid);
						$scope.error.isLoading = false;
						$scope.$apply();

		                ref.authWithPassword({
				            "email": email,
				            "password": password  
		        		}, function(authData) {
		        			
	        				var newUserAuth = ref.getAuth();
	        				var uid = ref.getAuth().uid;
	        				console.log("signup controller UID = " + uid)
	        				Users.add(uid, fullName, email);

		                	Users.setUserId(uid, function() {
		                		$state.go('contacts');
		                	});

		        		});

		            }
		    	}

		    	var ref = Users.getFirebaseRef();
		        ref.createUser({
		            "email": email,
		            "password": password  
		        }, authHandler)

	    	} else {
	    		$scope.errorMessage = "Passwords need to match.";
				$scope.error.isLoading = true;
	    	}

	    }


        var errorHandler = function(code) {
			if(code=="INVALID_EMAIL")
				return "The specified email address is invalid."
			else if (code == "EMAIL_TAKEN")
				return "The specified email address is already in use."
        }
	}]);


