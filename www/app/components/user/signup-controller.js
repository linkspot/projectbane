angular.module('linkspot')
	.controller('SignupController', ['$scope', '$state', function($scope, $state) {

		$scope.error = { isLoading: false };
		$scope.errorMessage = "Error";

	    $scope.signUp = function(submittedForm) {

	    	if (submittedForm.password === submittedForm.passwordConfirm) {
	    		// Also add in error check for no fields populated

		    	function authHandler(error, authData) {
		            if (error) {
		                $scope.errorMessage = errorHandler(error.code);
		                $scope.error.isLoading = true;
						$scope.$apply();
		            } else {
		                alert("Authenticated successfully with payload " + authData.uid, authData.uid);
						$scope.error.isLoading = false;
						$scope.$apply();

		                ref.authWithPassword({
				            "email": submittedForm.email,
				            "password": submittedForm.password  
		        		}, function(authData) {
		        			
	        				var newUserAuth = ref.getAuth();

		        		});
		               
		                $state.go('tab.profile');
		            }
		    	}

		        var ref = new Firebase("https://linkspot.firebaseIO.com/users");
		        ref.createUser({
		            "email": submittedForm.email,
		            "password": submittedForm.password  
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


