angular.module('linkspot')

.controller('ContactsShareEmailCtrl', ['$scope', '$state', '$stateParams','$ionicSideMenuDelegate', 'Contacts', 'Email', 'Users',
            function($scope, $state, $stateParams, $ionicSideMenuDelegate, Contacts, Email, Users) {

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        $ionicSideMenuDelegate.toggleRight(false);
        $scope.user = Users.get();

        $scope.contact = Contacts.get($stateParams.contactId);
        $scope.name = $scope.contact.firstName + " " + $scope.contact.lastName;
        $scope.title = "Share Contact";

        $scope.recipName = "";
        $scope.recipEmail = "Hi";
    });

    // Send Email - can only populate email for app to use.
    $scope.sendEmail = function() {
        var to = $scope.recipEmail;
        var from = $scope.user.email;
        console.log(from);
        console.log(to);
        var subject = "Hello - Testing from detail controller";
        var msg = "test test";
        Email.send(to, from, subject, msg).success(function() {
            console.log("Sent Email!");
        });
    };
}]);