angular.module('linkSpot')
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

	            			var url = 'http://api.qrcode.unitag.fr/api?t_pwd=degraded&T=PNG&setting={"LAYOUT":{"COLORBG":"ffffff","GRADIENT_TYPE":"DIAG1","COLOR1":"872BE3", "COLOR2":"DCC7F2"},"EYES":{"EYE_TYPE":"ECurve_ICurve"},"BODY_TYPE":1,"ARRONDI":7}';
	            			url += '&data={"DATA":{"TEXT":"' + newUserAuth.uid + '"},"TYPE":"text"}';

	        				fetchQRCode(url, function(imageCode) {
								ref.child('people').child(newUserAuth.uid).set({
									name: submittedForm.fullname,
			                		email: newUserAuth.password.email,
			                		thumbnail_url: newUserAuth.password.profileImageURL,
			                		qrCode: imageCode
		                		});
	        				});
		                	
		        		});
		               
		                $state.go('tabs.profile');
		            }
		    	}

		        var ref = new Firebase("https://linkspot.firebaseIO.com/");
		        ref.createUser({
		            "email": submittedForm.email,
		            "password": submittedForm.password  
		        }, authHandler)
	    	} else {
	    		$scope.errorMessage = "Passwords need to match.";
				$scope.error.isLoading = true;
	    	}


	    }

	    // TAKEN FROM QR CODE CONTROLLER. MAY NEED TO REFACTOR.
	    var fetchQRCode = function(uri, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', uri, true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function(e) {
                if(this.status == 200) {
                    var blob = this.response;
                    var str = String.fromCharCode.apply(null, new Uint8Array(blob));
                    var imageCode = 'data:image/png;base64,' + btoa(str);
                    if(callback) {
                        callback(imageCode);
                    }
                }
            };
            xhr.send();
        };

        var errorHandler = function(code) {
			if(code=="INVALID_EMAIL")
				return "The specified email address is invalid."
			else if (code == "EMAIL_TAKEN")
				return "The specified email address is already in use."
        }
	}]);