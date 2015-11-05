angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', '$ionicPopup','$ionicSideMenuDelegate', '$cordovaCamera', '$timeout', 'Contacts', 'Camera', 'Tags', 
            function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, $ionicSideMenuDelegate, $cordovaCamera, $timeout, Contacts, Camera, Tags) {
    
    // $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    //     viewData.enableBack = true;
    //     forceBackButton();
    // });

    $scope.name = "Temp";

    $scope.$on( "$ionicView.enter", function() {
        $scope.contact = Contacts.get($stateParams.contactId);
        $scope.name = $scope.contact.name;
        $scope.title = $scope.name;

        $scope.selectedTags = $scope.contact.tags;
        if ($scope.selectedTags == null)
            $scope.selectedTags = [];
        $scope.tags = Tags.all();
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

    $scope.toggleSelectTag = function(tag) {
        var index = _.indexOf($scope.selectedTags, tag);
        if (index != -1)
            $scope.selectedTags.splice(index, 1);
        else
            $scope.selectedTags.push(tag);
    }

  	// Contact
    $scope.updateContact = function() {
        $scope.contact.tags = $scope.selectedTags;
        // console.log($scope.contact);
  		Contacts.update($scope.contact);
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

    // Side Menus
    $scope.toggleLeftSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.toggleRightSideMenu = function() {
        $ionicSideMenuDelegate.toggleRight();
    };

    // Popup
    // Triggered on a button click, or some other target
    $scope.showPopup = function() {
        $scope.data = {}

        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.newTag">',
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
                        else
                            // return $scope.data.newTag;
                            console.log($scope.data.newTag);
                    }
                }
            ]
        });
    };

}]);