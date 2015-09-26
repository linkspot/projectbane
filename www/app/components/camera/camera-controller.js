angular.module('linkspot')

.controller('CameraCtrl', ['$scope', '$cordovaCamera', '$ionicPlatform', 'Contacts', '$cordovaDevice', '$state', function($scope, $cordovaCamera, $ionicPlatform, Contacts, $cordovaDevice, $state) {
    $ionicPlatform.ready(function() {
        // var device = $cordovaDevice.getDevice();
        // $scope.options = device;
        $scope.newID = "";
        $scope.takePicture = function() {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 350,
                targetHeight: 200,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            $cordovaCamera.getPicture(options)
            .then(function(imageData) {
              if(imageData != null) {
                var imageSrc = "data:image/jpeg;base64," + imageData;
                var id = Contacts.add(imageSrc);
                return id
              }
              else {
                return -1;
              }
            }, function(err) {
              alert(err);
            })
            .then(function(newID) {
                if (newID > 0) {
                  $state.go('tab.contacts-detail', { "contactId": newID });
                }
                
            });
        }
    });    

  }]);