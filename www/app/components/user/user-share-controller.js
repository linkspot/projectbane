angular.module('linkspot')

.controller('UserShareEmailCtrl', ['$scope', '$state', '$stateParams','$ionicSideMenuDelegate', 'Contacts', 'Email', 'Users',
            function($scope, $state, $stateParams, $ionicSideMenuDelegate, Contacts, Email, Users) {

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        $ionicSideMenuDelegate.toggleRight(false);
        $scope.user = Users.get();

        console.log($scope.user);
        $scope.name = $scope.user.firstName + " " + $scope.user.lastName;
        $scope.title = "Share Contact";
    });
    $scope.recip = { name: "", email: ""};

    // Send Email - can only populate email for app to use.
    $scope.sendEmail = function(to) {
        var from = $scope.user.email;
        console.log(from);
        console.log(to);
        var subject = "Hello - Testing from USER detail controller";
        var msg = Email.createEmail($scope.user, "Hello");
        Email.send(to, from, subject, msg).success(function() {
            console.log("Sent Email!");
        });
    };
}]);