angular.module('linkspot')

.controller('ProfileCtrl', function($scope, CameraService) {
	$scope.profilePhoto = CameraService.getProfile();
});