angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', 'Contacts', function($scope, $state, $stateParams, $ionicHistory, Contacts) {
	$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    	viewData.enableBack = true;
    	forceBackButton();
	});

  	$scope.$on( "$ionicView.enter", function() {
        $scope.contact = Contacts.get($stateParams.contactId);
    });

    $scope.removeContact = function() {
    	Contacts.remove($scope.contact);
    	$state.go('tab.contacts');
    }

    var forceBackButton = function() {
		var history = $ionicHistory.backView();
	    history.url = "/tab/contacts";
	    history.stateId = "tab.contacts";
	    history.stateName = "tab.contacts";
	    history.title = "Contacts";
    }
}]);