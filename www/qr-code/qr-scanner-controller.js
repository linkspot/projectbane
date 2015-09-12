angular.module('linkSpot')

  .controller('BarcodeController', ['$scope', '$cordovaBarcodeScanner', '$ionicPlatform', function($scope, $cordovaBarcodeScanner, $ionicPlatform) {

    $ionicPlatform.ready(function() {
      console.log("device is ready")
      $scope.scanBarcode = function() {
        console.log("button ")
        $cordovaBarcodeScanner
        .scan()
        .then(function(imageData) {
          alert(imageData.text);
          console.log("format " + imageData.format);
        }, function(error) {
          console.log("An error happened " + error);
        });
      }
    });    

  }])
