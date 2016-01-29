angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', '$ionicPopup','$ionicSideMenuDelegate', '$cordovaCamera', '$jrCrop', '$timeout', 'Contacts', 'Camera', 'Email', 'Tags',
            function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, $ionicSideMenuDelegate, $cordovaCamera, $jrCrop, $timeout, Contacts, Camera, Email, Tags) {
    
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        $ionicSideMenuDelegate.toggleRight(false);
        $scope.contact = Contacts.get($stateParams.contactId);
        console.log($scope.contact);
        $scope.name = $scope.contact.firstName + " " + $scope.contact.lastName;
        $scope.title = $scope.name;

        $scope.contactEdit = angular.copy(Contacts.get($stateParams.contactId));
        $scope.contactUpdate = Contacts.get($stateParams.contactId);

        $scope.selectedTags = $scope.contact.tags;
        if ($scope.selectedTags == null)
            $scope.selectedTags = [];
        $scope.tags = Tags.all();
    });

    $scope.$on( "$ionicView.enter", function() {

    });

    // Test
    $scope.cropImage = function(url) {
        var crop = Camera.cropImage(url);
        crop.then(function(image) {
            var testImage = document.getElementById("test-img");
            testImage.src = image;
        },
        function() {});
    };

    $scope.shareContact = function() {
        $state.go('contacts-share-email', { "contactId": $stateParams.contactId });
    };

    $scope.profile = function() {
        $state.go('profile');
    };

    $scope.logout = function() {
        $state.go('login');
    };

    $scope.toggleRightSideMenu = function() {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.updateContactNotes = function() {
        $scope.contactUpdate.notes = $scope.contactEdit.notes;
        $scope.contact.notes = $scope.contactEdit.notes;
        Contacts.update($scope.contactUpdate);
    };

    $scope.showPopup = function() {
      var myPopup = $ionicPopup.show({
        template: '<input type="text" class="notes-popup" ng-model="contactEdit.notes">',
        title: 'Enter Notes',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
                $scope.updateContactNotes();
            }
          }
        ]
      });
    }


}]);
