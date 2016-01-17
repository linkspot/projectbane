angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', '$ionicPopup','$ionicSideMenuDelegate', '$cordovaCamera', '$jrCrop', '$timeout', 'Contacts', 'Camera', 'Email', 'Tags', 
            function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, $ionicSideMenuDelegate, $cordovaCamera, $jrCrop, $timeout, Contacts, Camera, Email, Tags) {
    
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

    $scope.$on( "$ionicView.enter", function() {

    });

    // Test
    $scope.cropImage = function(url) {
        $jrCrop.crop({
            url: url,
            width: 150,
            height: 50
        }).then(function(canvas) {
            // success!
            var image = canvas.toDataURL();
        }, function() {
            // User canceled or couldn't load image.
        });
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


}]);
