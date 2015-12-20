angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', '$ionicPopup','$ionicSideMenuDelegate', '$cordovaCamera', '$cordovaEmailComposer', '$timeout', 'Contacts', 'Camera', 'Tags', 
            function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, $ionicSideMenuDelegate, $cordovaCamera, $cordovaEmailComposer, $timeout, Contacts, Camera, Tags) {
    
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        $ionicSideMenuDelegate.toggleRight(false);
        $scope.contact = Contacts.get($stateParams.contactId);
        console.log($scope.contact);
        $scope.name = $scope.contact.firstName + " " + $scope.contact.lastName;
        $scope.title = $scope.name;

        $scope.selectedTags = $scope.contact.tags;
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
        $scope.contact.company      = document.getElementById('company').value,
        $scope.contact.title        = document.getElementById('title').value,
        $scope.contact.firstName    = document.getElementById('firstName').value,
        $scope.contact.lastName     = document.getElementById('lastName').value,
        $scope.contact.phone        = document.getElementById('phone').value,
        $scope.contact.email        = document.getElementById('email').value,
        $scope.contact.tags         = $scope.selectedTags

  		Contacts.update($scope.contact);
        $state.go('contacts-detail', { "contactId": $scope.contact.id });

  	}
    $scope.updateContactNotes = function() {
        $scope.contact.notes = document.getElementById('contactNotes').value;
        Contacts.update($scope.contact);
        $state.go('contacts-detail', { "contactId": $scope.contact.id });
    }

    $scope.removeContact = function() {
        Contacts.remove($scope.contact);
        $state.go('tab.contacts');
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
                $scope.contact.card = imageSrc;
                Contacts.update($scope.contact);
            }
        }, 
        function(err) {
            alert(err);
        })
        .then(function() {
            $state.go($state.current, {}, {reload: true});
        });
    }

    // Send Email - can only populate email for app to use.
    $scope.sendEmail = function() {
        var email = {
            to: 'angelgirl2272@gmail.com',
            cc: 'angelal4@uci.edu',
            bcc: ['92.angelali@gmail.com', 'angela-li@live.com'],
            subject: 'Cordova Icons',
            body: 'How are you? Nice greetings from Leipzig',
            isHtml: true
        };
        $cordovaEmailComposer.open(email).then(null, function () {
            // user cancelled email
            console.log("user cancelled email");
        });
    };

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

}]);
