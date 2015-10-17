angular.module('linkspot')

.controller('ContactsCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', 'Contacts', 'Tags', function($scope, $state, $ionicSideMenuDelegate, Contacts, Tags) {
// With the new view caching in Ionic, Controllers are only called
// when they are recreated or on app start, instead of every page change.
// To listen for when this page is active (for example, to refresh data),
// listen for the $ionicView.enter event:
//
//$scope.$on('$ionicView.enter', function(e) {
//});
    $scope.title = "Contacts";
    $scope.tag = "";
    $scope.search = "";
    $scope.contacts = Contacts.all();
    $scope.tags = Tags.all();

    // Contacts
    $scope.addContact = function(contact) {
        Contacts.add(contact);
    };

    $scope.remove = function(contact) {
        Contacts.remove(contact);
    };

    // Filters
    $scope.filterBy = function(filter) {
        console.log("Filter: " + filter);
        $scope.tag = filter;
    };

    $scope.toggleLeftSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
        if($scope.title == "Contacts")
            $scope.title = "Filter by Tag";
        else
            $scope.title = "Contacts";
    };

}]);