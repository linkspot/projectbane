angular.module('linkspot')

.controller('CameraCtrl', ['$scope', '$cordovaCamera', '$ionicPlatform', 'Contacts', 'Camera', '$state', '$jrCrop', '$q',
            function($scope, $cordovaCamera, $ionicPlatform, Contacts, Camera, $state, $jrCrop, $q) {

    $ionicPlatform.ready(function() {

        $scope.takePicture = function() {
            Camera.showActionSheet($scope.setContactPicture);
        }

        $scope.setContactPicture = function(options) {
            $cordovaCamera.getPicture(options)
            .then(function(imageData) {
              if(imageData != null) {
                var imageSrc = "data:image/jpeg;base64," + imageData;
                console.log("before crop");
                var crop = $scope.cropImage(imageSrc);
                crop.then(function(croppedImage) {
                  console.log("after crop");
                  var id = Contacts.add(croppedImage);
                  return id;
                },
                function() {
                  return -1;
                });

                // var id = Contacts.add(imageSrc);
                // return id;
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

        $scope.cropImage = function(url) {
          var deferred = $q.defer();
          $jrCrop.crop({
            url: url,
            width: 350,
            height: 200
          })
          .then(function(canvas) {
            // success!
            var image = canvas.toDataURL();
            console.log(image);
            deferred.resolve(image);
          }, function() {
            // User cancelled or couldn't load image.
            deferred.reject("No image");
          });
          return deferred.promise;
        }
    });  

  }]);