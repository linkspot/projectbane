
angular.module('linkSpot')

  .controller('ListController', ['$scope', '$http', '$state', 'Contacts', function($scope, $http, $state, Contacts){

    $scope.contacts = Contacts;
    $scope.whichContact = $state.params.cId;
    $scope.data = {
      showDelete: false,
      showReorder: false
    };

  $scope.onItemDelete = function(contact) {
   $scope.contacts.splice($scope.contacts.indexOf(contact), 1)
  };

  $scope.moveItem = function(contact, fromIndex, toIndex) {
    $scope.contacts.splice(fromIndex, 1);
    $scope.contacts.splice(toIndex, 0, contact);
  };

  $scope.toggleStar = function(contact) {
   contact.star = !contact.star;
  }

  $scope.doRefresh = function() {
      $http.get('js/data.json').success(function(data) {
         $scope.contacts = data;
         $scope.$broadcast('scroll.refreshComplete');
      });
  }


}])