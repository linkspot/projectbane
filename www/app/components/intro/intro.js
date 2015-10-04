angular.module('linkspot')
	.controller('IntroCtrl', ['$state', '$scope', '$ionicSlideBoxDelegate', function($state, $scope, $ionicSlideBoxDelegate) {

		// Called to navigate to the main app
		$scope.startApp = function() {
			$state.go('login');
		};

		// Called each time the slide changes
		$scope.slideChanged = function(index) {
			$scope.slideIndex = index;
		};


	}]);