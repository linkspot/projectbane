angular.module('linkspot')

.controller('ProfileCtrl', ['$scope', '$state', '$cordovaCamera', '$ionicActionSheet', '$ionicPlatform','$timeout', 'Users', 'Contacts',
	function($scope, $state, $cordovaCamera, $ionicActionSheet, $ionicPlatform, $timeout, Users, Contacts) {

	// $scope.user = "";

	$scope.$on( "$ionicView.enter", function() {
        // $scope.profilePhoto = Camera.getProfile();
        $scope.user = Users.get();
    });

	$scope.updateProfile = function() {
		Users.update($scope.user);
	}

    // Triggered on a button click, or some other target
	$scope.showActionSheet = function() {
	   // Show the action sheet
	   var hideSheet = $ionicActionSheet.show({
     	buttons: [
	       { text: '<i class="icon ion-camera"></i>Take Picture' },
	       { text: '<i class="icon ion-images"></i>Upload From Gallery' }
	     ],
	     titleText: '<font color="black">Choose Picture Source</font>',
	     cancelText: 'Cancel',
	     cancel: function() {
	          // add cancel code..
	        },
	     	buttonClicked: function(index) {
	            // console.log('CAMERA ACTIONSHEET BUTTON CLICKED', index);
	            if (index === 0) {
	            	options = {
		                quality: 50,
		                destinationType: Camera.DestinationType.DATA_URL,
		                sourceType: Camera.PictureSourceType.CAMERA,
		                allowEdit: true,
		                encodingType: Camera.EncodingType.JPEG,
		                targetWidth: 350,
		                targetHeight: 200,
		                popoverOptions: CameraPopoverOptions,
		                saveToPhotoAlbum: false,
		                correctOrientation: true
		            };
	                $scope.setProfilePicture(options);
	            } else if (index === 1) {
	                options = {
	                	quality : 50, 
	                	destinationType : Camera.DestinationType.DATA_URL, 
	                	sourceType : 0, 
	                	allowEdit: true,
		                encodingType: Camera.EncodingType.JPEG,
		                targetWidth: 350,
		                targetHeight: 200,
	                	correctOrientation : true
	                };
	                $scope.setProfilePicture(options);
	            }                      
	            // if (callback && typeof(callback) === "function") {
	            //     callback();
	            // }                                                       
	            return true;
        	}
	   });
	}

	$ionicPlatform.ready(function() {

        $scope.setProfilePicture = function(options) {
            $cordovaCamera.getPicture(options)
            .then(function(imageData) {
				if(imageData != null) {
					var imageSrc = "data:image/jpeg;base64," + imageData;
					$scope.user.card = imageSrc;
					Users.update($scope.user);
				}
            }, 
            function(err) {
				alert(err);
            })
            .then(function() {
            	$state.go($state.current, {}, {reload: true});
            });
        }
    });

	
}]);