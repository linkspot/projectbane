angular.module('linkspot')

.controller('CameraCtrl', ['$scope', '$cordovaCamera', '$ionicPlatform', 'Contacts', '$cordovaDevice', '$state', function($scope, $cordovaCamera, $ionicPlatform, Contacts, $cordovaDevice, $state) {
    $scope.options = "hello";
    $ionicPlatform.ready(function() {
        console.log("device is ready");
        var device = $cordovaDevice.getDevice();
        $scope.options = device;
        $scope.newID = "";
        $scope.takePicture = function() {
            console.log("taking picture");
            var options = {
                  quality: 50,
                  destinationType: Camera.DestinationType.DATA_URL,
                  sourceType: Camera.PictureSourceType.CAMERA,
                  allowEdit: false,
                  encodingType: Camera.EncodingType.PNG,
                  targetWidth: 350,
                  targetHeight: 200,
                  popoverOptions: CameraPopoverOptions,
                  saveToPhotoAlbum: true,
                  correctOrientation: true
            };

            $scope.options = options;

            $cordovaCamera.getPicture(options)
            .then(function(imageData) {
              // Test
              var image = document.getElementById('myImage');
              image.src = "data:image/jpeg;base64," + imageData;
              // TODO: Not clearing cache on phone.
              Contacts.add(image.src);
              return Contacts.all().length - 1;
              console.log(Contacts.all());
              console.log(Contacts.all().length);
              // movePic(imageData);

            }, function(err) {
              alert(err);
            })
            .then(function(newID) {
                $state.go('tab.contacts-detail', { "contactId": newID });
            });
        }

        // function movePic(file){
        //   window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
        // }

        // function resolveOnSuccess(entry) {
        //   var date = new Date();
        //   var time = date.getTime();

        //   var newFileName = time + ".png";
        //   var myFolderApp = "ProjectBane";
        // }
      
    });    

  }]);