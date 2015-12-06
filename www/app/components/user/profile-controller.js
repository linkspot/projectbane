angular.module('linkspot')

.controller('ProfileCtrl', ['$scope', '$state', '$cordovaCamera', '$ionicPlatform', 'Users', 'Camera', '$ionicSideMenuDelegate',
	function($scope, $state, $cordovaCamera, $ionicPlatform, Users, Camera, $ionicSideMenuDelegate) {

	// $scope.user = "";

	$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        // $scope.profilePhoto = Camera.getProfile();
        $scope.user = Users.get();
    });

	$scope.updateProfile = function() {
		Users.update($scope.user);
	}

	$scope.showProfileActionSheet = function() {
		Camera.showActionSheet($scope.setProfilePicture);
	}

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

    $scope.toggleRightSideMenu = function() {
        $scope.updateRightMenuTitle();
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.updateRightMenuTitle = function() {
        if($ionicSideMenuDelegate.isOpenRight())
            $scope.title = "Contacts";
        else
            $scope.title = "Menu";
    };

    $scope.logout = function() {
        $state.go('login');
    };

	
}]);