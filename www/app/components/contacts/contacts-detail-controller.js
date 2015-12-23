angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', '$ionicPopup','$ionicSideMenuDelegate', '$cordovaCamera', '$cordovaEmailComposer', '$timeout', 'Contacts', 'Camera', 'Tags', 
            function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, $ionicSideMenuDelegate, $cordovaCamera, $cordovaEmailComposer, $timeout, Contacts, Camera, Tags) {
    
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
        var email = {
            to: 'angelgirl2272@gmail.com',
            cc: 'angelal4@uci.edu',
            bcc: ['92.angelali@gmail.com', 'angela-li@live.com'],
            subject: 'Cordova Icons',
            body: 'How are you? Nice greetings from Leipzig',
            isHtml: true
        };
        $cordovaEmailComposer.open(email).then(null, function () {
            // user cancelled email
            console.log("user cancelled email");
        });
    };

    $scope.profile = function() {
        $state.go('profile');
    };

    $scope.logout = function() {
        $state.go('login');
    };

}]);
