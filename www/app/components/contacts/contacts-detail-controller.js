angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$stateParams', 'Contacts', function($scope, $stateParams, Contacts) {

  	$scope.$on( "$ionicView.enter", function() {
        $scope.contact = Contacts.get($stateParams.contactId);
        console.log($scope.contact.face);
        console.log($stateParams.contactId);
    });
}]);