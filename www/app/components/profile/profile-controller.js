angular.module('linkspot')

.controller('ProfileCtrl', function($scope, CameraService) {
	$scope.$on( "$ionicView.enter", function() {
        $scope.profilePhoto = CameraService.getProfile();
    });
	
});