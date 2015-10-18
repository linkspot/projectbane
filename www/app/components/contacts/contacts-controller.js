angular.module('linkspot')

.controller('ContactsCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', '$ionicPopover', 'Contacts', 'Tags', 
            function($scope, $state, $ionicSideMenuDelegate, $ionicPopover, Contacts, Tags) {
// With the new view caching in Ionic, Controllers are only called
// when they are recreated or on app start, instead of every page change.
// To listen for when this page is active (for example, to refresh data),
// listen for the $ionicView.enter event:
//
//$scope.$on('$ionicView.enter', function(e) {
//});
    $scope.title = "Contacts";
    $scope.contacts = Contacts.all();

    $scope.tag = "";
    $scope.tags = Tags.all();

    $scope.search = "";
    $scope.field = "name";
    $scope.fields = ["name", "phone", "email"];

    // Contacts
    $scope.addContact = function(contact) {
        Contacts.add(contact);
    };

    $scope.remove = function(contact) {
        Contacts.remove(contact);
    };

    // Filters
    $scope.checkField = function(field) {
        return $scope.field == field ? true : false;
    }

    $scope.filterBy = function(filter) {
        $scope.tag = filter;
        $scope.updateLeftMenuTitle();
    };

    $scope.searchBy = function(field) {
        $scope.field = field;
        $scope.closePopover();
        // $scope.updateRightMenuTitle();
    };

    // Popovers
    $ionicPopover.fromTemplateUrl('app/components/contacts/popover-search.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };

    $scope.closePopover = function() {
        $scope.popover.hide();
    };

    // Side Menus
    $scope.toggleLeftSideMenu = function() {
        $scope.updateLeftMenuTitle();
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.toggleRightSideMenu = function() {
        $scope.updateRightMenuTitle();
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.updateLeftMenuTitle = function() {
        if($ionicSideMenuDelegate.isOpenLeft())
            $scope.title = "Contacts";
        else
            $scope.title = "Filter by Tag";
    }

    $scope.updateRightMenuTitle = function() {
        if($ionicSideMenuDelegate.isOpenRight())
            $scope.title = "Contacts";
        else
            $scope.title = "Search by Field";
    }

}]);