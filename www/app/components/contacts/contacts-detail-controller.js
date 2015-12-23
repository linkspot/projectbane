angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', '$ionicPopup','$ionicSideMenuDelegate', '$cordovaCamera', '$timeout', 'Contacts', 'Camera', 'Email', 'Tags', 
            function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, $ionicSideMenuDelegate, $cordovaCamera, $timeout, Contacts, Camera, Email, Tags) {
    
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

    // Send Email - can only populate email for app to use.
    $scope.sendEmail = function() {
        var to = "angelgirl2272@gmail.com";
        var from = "angelal4@uci.edu";
        var subject = "Hello - Testing from detail controller";
        var msg = "test test";
        Email.send(to, from, subject, msg).success(function() {
            console.log("Sent Email!");
        });
    };

    $scope.profile = function() {
        $state.go('profile');
    };

    $scope.logout = function() {
        $state.go('login');
    };

}]);
