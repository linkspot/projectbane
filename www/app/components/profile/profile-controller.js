angular.module('linkspot')

.controller('ProfileCtrl', ['$scope', 'CameraService', '$ionicActionSheet', '$timeout', function($scope, CameraService, $ionicActionSheet, $timeout) {

	$scope.$on( "$ionicView.enter", function() {
        $scope.profilePhoto = CameraService.getProfile();
    });

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
	            console.log('CAMERA ACTIONSHEET BUTTON CLICKED', index);
	            if (index === 0) {
	                options = {quality : 50, destinationType : 1, sourceType : 1, correctOrientation : true};
	            } else if (index === 1) {
	                options = {quality : 50, destinationType : 1, sourceType : 0, correctOrientation : true};
	            }                      
	            if (callback && typeof(callback) === "function") {
	                callback();
	            }                                                       
	            return true;
        	}
	   });

	   // For example's sake, hide the sheet after two seconds
	 //   $timeout(function() {
		// 	hideSheet();
		// }, 5000);

	}
	
}]);