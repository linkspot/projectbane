angular.module('linkspot')

.controller('CameraCtrl', ['$scope', '$cordovaCamera', '$ionicPlatform', function($scope, $cordovaCamera, $ionicPlatform, CameraService) {
    $ionicPlatform.ready(function() {
      console.log("device is ready")
        $scope.takePicture = function() {
            var options = {
                  quality: 50,
                  destinationType: Camera.DestinationType.DATA_URL,
                  sourceType: Camera.PictureSourceType.CAMERA,
                  allowEdit: true,
                  encodingType: Camera.EncodingType.JPEG,
                  targetWidth: 100,
                  targetHeight: 100,
                  popoverOptions: CameraPopoverOptions,
                  saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
              // Test
              var image = document.getElementById('myImage');
              image.src = "data:image/jpeg;base64," + imageData;

              // TODO: Not clearing cache on phone.
              CameraService.setProfile("data:image/jpeg;base64," + imageData);


            }, function(err) {
              // error
            });
        }
      
    });    

  }]);