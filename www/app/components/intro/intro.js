angular.module('linkspot')
	.controller('IntroCtrl', ['$state', '$scope', '$ionicSlideBoxDelegate', function($state, $scope, $ionicSlideBoxDelegate) {

		// Called to navigate to the main app
		$scope.startApp = function() {
			$state.go('login');
		};

		$scope.goToLogin = function() {
			$state.go('login');
		}

		$scope.goToSignup = function() {
			$state.go('signup');
		}

		// Called each time the slide changes
		$scope.slideChanged = function(index) {
			$scope.slideIndex = index;
		};


	}]);