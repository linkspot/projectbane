angular.module('linkspot')

.controller('ContactsCtrl', ['$scope', '$state', '$cordovaCamera','$ionicSideMenuDelegate', '$ionicPopover', 'Camera', 'Contacts', 'Tags', 'Users',
            function($scope, $state, $cordovaCamera, $ionicSideMenuDelegate, $ionicPopover, Camera, Contacts, Tags, Users) {
// With the new view caching in Ionic, Controllers are only called
// when they are recreated or on app start, instead of every page change.
// To listen for when this page is active (for example, to refresh data),
// listen for the $ionicView.enter event:
//
//$scope.$on('$ionicView.enter', function(e) {
//});

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
        $ionicSideMenuDelegate.toggleRight(false);
        $scope.title = "Contacts";
        $scope.contacts = Contacts.all();
        $scope.companies = Contacts.companies();
    });

    $scope.tags = Tags.allTrimmed();
    $scope.selectedTags = [];

    $scope.search = "";
    $scope.field = "fullName";
    $scope.fields = ["name", "phone", "email", "company", "fullName"];

    $scope.$watch(
        function () {
            return $ionicSideMenuDelegate.isOpenLeft();
        },
        function (isOpen) {
            if (isOpen)
                $scope.title = "Select Tags";
            else
                $scope.title = "Contacts";           
        }
    );

    // Contacts
    $scope.addContact = function(contact) {
        Contacts.add(contact);
    };

    $scope.remove = function(contact) {
        Contacts.remove(contact);
    };

    // Camera
    $scope.showContactActionSheet = function() {
        Camera.showActionSheet($scope.setContactPicture);
    }

    $scope.setContactPicture = function(options) {
        $cordovaCamera.getPicture(options)
        .then(function(imageData) {
          if(imageData != null) {
            var imageSrc = "data:image/jpeg;base64," + imageData;
            var id = Contacts.add(imageSrc);
            return id;
          }
          else {
            return -1;
          }
        }, function(err) {
          alert(err);
        })
        .then(function(newID) {
            if (newID >= 0) {
              // $state.go('tab.contacts-detail', { "contactId": newID });
              $state.go('contacts-detail-edit', { "contactId": newID });
            }
        });
    }

    // Filters
    $scope.checkField = function(field) {
        return $scope.field == field ? true : false;
    }

    $scope.checkSearch = function(selectedTags, search, company) {
        // Check if search is empty. If so, assign search to an empty string.
        var searchName = "";
        if (typeof search.fullName !== 'undefined')
            searchName = search.fullName.toLowerCase();

        // Initialize variables.
        var contacts = $scope.companies[company];
        var containsSearch = false;
        var containsTags = false;

        // For all contacts, check if contact is in search and also in tags.
        for (var i = 0; i < contacts.length; i++) {
            var contact = contacts[i].fullName.toLowerCase();
            if (contact.indexOf(searchName) > -1)
                containsSearch = true;

            var tags = contacts[i].tags;
            var commonTags = _.intersection(selectedTags, tags);
            if (commonTags.length > 0)
                containsTags = true;
        }

        // If no search and no tags, return all contacts.
        if (searchName == "")
            containsSearch = true;
        if (selectedTags.length == 0)
            containsTags = true;

        // Otherwise, return all contacts that satisfies both search and tag conditions.
        return containsSearch && containsTags;
    }

    $scope.clearSelectedTags = function() {
        $scope.selectedTags = [];
    }

    $scope.isSelected = function(tag) {
        return _.contains($scope.selectedTags, tag);
    }

    $scope.toggleSelectTag = function(tag) {
        var index = _.indexOf($scope.selectedTags, tag);
        if (index != -1)
            $scope.selectedTags.splice(index, 1);
        else
            $scope.selectedTags.push(tag);
        // console.log($scope.selectedTags);
    }

    // // Popovers
    // $ionicPopover.fromTemplateUrl('app/components/contacts/popover-search.html', {
    //     scope: $scope,
    // }).then(function(popover) {
    //     $scope.popover = popover;
    // });

    // $scope.openPopover = function($event) {
    //     $scope.popover.show($event);
    // };

    // $scope.closePopover = function() {
    //     $scope.popover.hide();
    // };

    // Side Menus
    $scope.toggleLeftSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.toggleRightSideMenu = function() {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.profile = function() {
        $state.go('profile');
    };

    $scope.logout = function() {
        $state.go('login');
    };

}]);
