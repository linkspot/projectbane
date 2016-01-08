angular.module('linkspot')

.controller('ContactsDetailEditCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', '$ionicPopup','$ionicSideMenuDelegate', '$cordovaCamera', '$cordovaEmailComposer', '$timeout', 'Contacts', 'Camera', 'Tags', '$rootScope', 
            function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, $ionicSideMenuDelegate, $cordovaCamera, $cordovaEmailComposer, $timeout, Contacts, Camera, Tags, $rootScope) {
    
    var contactBeforeUpdate = {};

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        $ionicSideMenuDelegate.toggleRight(false);

        $scope.contactEdit = angular.copy(Contacts.get($stateParams.contactId));
        $scope.contactUpdate = Contacts.get($stateParams.contactId);

        // $scope.contactEdit = angular.copy(Contacts.get($stateParams.contactId));
        // contactBeforeUpdate = angular.copy($scope.contactEdit);


        console.log($scope.contactBeforeUpdate);
        $scope.name = $scope.contactEdit.firstName + " " + $scope.contactEdit.lastName;
        $scope.title = $scope.name;

        $scope.selectedTags = $scope.contactEdit.tags;
        if ($scope.selectedTags == null)
            $scope.selectedTags = [];
        $scope.tags = Tags.all();
    });

    // $scope.name = "Temp";

    $scope.$on( "$ionicView.enter", function() {
        var contactNotes = document.getElementById("contactNotes");
        if (contactNotes != null) {
            contactNotes.focus;
        }
    });

    $scope.$watch(
        function () {
            return $ionicSideMenuDelegate.isOpenLeft();
        },
        function (isOpen) {
            if (isOpen)
                $scope.title = "Select Tags";
            else
                $scope.title = $scope.name;           
        }
    );
    
    // Modify Tags
    $scope.isSelected = function(tag) {
        return _.contains($scope.selectedTags, tag);
    }

    $scope.isNotFirst = function(tag) {
        return _.indexOf($scope.selectedTags, tag) > 0;
    }

    $scope.toggleSelectTag = function(tag) {
        var index = _.indexOf($scope.selectedTags, tag);
        if (index != -1)
            $scope.selectedTags.splice(index, 1);
        else
            $scope.selectedTags.push(tag);
    }

        // Contact
    $scope.updateContact = function() {
        $scope.contactUpdate.tags         = $scope.selectedTags;
        $scope.contactUpdate.company      = $scope.contactEdit.company;
        $scope.contactUpdate.title        = $scope.contactEdit.title;
        $scope.contactUpdate.firstName    = $scope.contactEdit.firstName;
        $scope.contactUpdate.lastName     = $scope.contactEdit.lastName;
        $scope.contactUpdate.phone        = $scope.contactEdit.phone;
        $scope.contactUpdate.email        = $scope.contactEdit.email;
        Contacts.update($scope.contactUpdate);
        $state.go('contacts-detail', { "contactId": $scope.contactEdit.id });

    }

    $scope.updateContactNotes = function() {
        $scope.contactEdit.notes = document.getElementById('contactNotes').value;
        Contacts.update($scope.contactEdit);
        $state.go('contacts-detail', { "contactId": $scope.contactEdit.id });
    }

    $scope.goBackToDetail = function() {
        $state.go('contacts-detail', { "contactId": $scope.contactEdit.id });
    }

    $scope.removeContact = function() {
        // A confirm dialog
          var confirmPopup = $ionicPopup.confirm({
            title: 'Delete Contact Confirmation',
            template: 'Are you sure you want to delete this contact?'
          });

        confirmPopup.then(function(res) {
            if(res) {
                console.log('Contact Deleted');
                Contacts.remove($scope.contactEdit);
                $state.go('tab.contacts');
            } else {
                console.log('Contact Not Deleted');
            }
        });
    }

    // Update Business Card.
    $scope.showContactActionSheet = function() {
        Camera.showActionSheet($scope.setContactPicture);
    }

    $scope.setContactPicture = function(options, contact) {
        $cordovaCamera.getPicture(options)
        .then(function(imageData) {
            if(imageData != null) {
                var imageSrc = "data:image/jpeg;base64," + imageData;
                $scope.contactEdit.card = imageSrc;
                Contacts.update($scope.contactEdit);
            }
        }, 
        function(err) {
            alert(err);
        })
        .then(function() {
            $state.go($state.current, {}, {reload: true});
        });
    }

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

    // Popup
    // Triggered on a button click, or some other target
    $scope.showPopup = function() {
        $scope.data = {}

        var myPopup = $ionicPopup.show({
            template: '<input autofocus type="text" ng-model="data.newTag">',
            title: 'Add New Tag',
            subTitle: 'Please type in new tag name.',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Add</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.newTag)
                            e.preventDefault();  //don't allow the user to close unless he enters wifi password
                        else {
                            // return $scope.data.newTag;
                            console.log($scope.data.newTag);
                            Tags.add($scope.data.newTag);
                        }
                    }
                }
            ]
        });

        window.cordova.plugins.Keyboard.show();

        myPopup.then(function(res) {
            $state.go($state.current, {}, {reload: true});
        });
    };

    $scope.$ionicGoBack = function() {
        $state.go('contacts-detail', { "contactId": $scope.contactEdit.id });
        console.log($scope.contactEdit);

    };



}]);
