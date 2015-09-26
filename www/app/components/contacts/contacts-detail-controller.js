angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', 'Contacts', function($scope, $state, $stateParams, Contacts) {
  	$scope.$on( "$ionicView.enter", function() {
        $scope.contact = Contacts.get($stateParams.contactId);
        console.log("control detail contact face: " + $scope.contact.face);
        console.log("control detail contact id: " + $stateParams.contactId);
    });

    $scope.removeContact = function() {
    	Contacts.remove($scope.contact);
    	$state.go('tab.contacts');
    }
}]);