angular.module('linkspot')

.controller('CameraCtrl', ['$scope', '$cordovaCamera', '$ionicPlatform', 'CameraService', '$cordovaDevice', function($scope, $cordovaCamera, $ionicPlatform, CameraService, $cordovaDevice) {
    $scope.options = "hello";

    $ionicPlatform.ready(function() {
        console.log("device is ready");
        // var device = $cordovaDevice.getDevice();
        // $scope.options = device;
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

            //$scope.options = options;

            // $cordovaCamera.getPicture(options).then(function(imageData) {
            //     // Test
            //     var image = document.getElementById('myImage');
            //     image.src = "data:image/png;base64," + imageData;

            //     CameraService.setProfile("data:image/png;base64," + imageData);

            // }, function(err) {
            //     // error
            // });

            options["destinationType"] = Camera.DestinationType.FILE_URI;
            $cordovaCamera.getPicture(options).then(function(imageURI) {
                // Test
                var image = document.getElementById('myImage');
                image.src = imageURI;
                $scope.options = imageURI;

                CameraService.setProfile(imageURI);
                $scope.movePic(imageURI);
            })
        }

        $scope.movePic = function(file){
            $scope.options = "LocalFileSystem.PERSISTENT";
            window.resolveLocalFileSystemURL(file, $scope.resolveOnSuccess, resOnError);
        }

        $scope.resolveOnSuccess = function(entry) {
            console.log("resolve on success");    
            var date = new Date();
            console.log(date);
            var time = date.getTime();

            var newFileName = time + ".png";
            var myFolderApp = "ProjectBane";
            console.log(newFileName);

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
              // The folder is created if it doesn't exist
              console.log("within request file system");
              // TODO: Not working.
              fileSys.root.getDirectory(myFolderApp, 
                                      {created: true, exclusive: false},
                                      function(directory) {
                                            console.log("moveTo");
                                            entry.moveTo(directory, newFileName, successMove, resOnError);
                                      }, 
                                      resOnError);
            }, resOnError);
        }
      
        function successMove(entry) {
          //Store imagepath in session for future use
          // like to store it in database
          //sessionStorage.setItem('imagepath', entry.fullPath);
          console.log("moved successfully");
        }

        function resOnError(error) {
          alert(error.code);
        }
    });    

  }]);