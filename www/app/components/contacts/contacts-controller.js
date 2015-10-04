angular.module('linkspot')

.controller('ContactsCtrl', ['$scope', '$state', 'Contacts', function($scope, $state, Contacts) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.search = "";
  $scope.contacts = Contacts.all();

  $scope.addContact = function(contact) {
    Contacts.add(contact);
  };

  $scope.remove = function(contact) {
    Contacts.remove(contact);
  };

}]);