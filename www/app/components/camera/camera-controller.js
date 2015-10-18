angular.module('linkspot')

.controller('CameraCtrl', ['$scope', '$cordovaCamera', '$ionicPlatform', 'Contacts', 'Camera', '$state', 
            function($scope, $cordovaCamera, $ionicPlatform, Contacts, Camera, $state) {

    $ionicPlatform.ready(function() {

        $scope.takePicture = function() {
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
                  $state.go('tab.contacts-detail', { "contactId": newID });
                }
            });
        }
    });  

  }]);