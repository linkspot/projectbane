angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('CameraCtrl', ['$scope', '$cordovaCamera', '$ionicPlatform', function($scope, $cordovaCamera, $ionicPlatform) {

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
                  var image = document.getElementById('myImage');
                  image.src = "data:image/jpeg;base64," + imageData;
            }, function(err) {
              // error
            });
        }
      
    });    

  }])