angular.module('linkspot')

.controller('ContactsShareEmailCtrl', ['$scope', '$state', '$stateParams','$ionicSideMenuDelegate', 'Contacts', 'Email', 
            function($scope, $state, $stateParams, $ionicSideMenuDelegate, Contacts, Email, Tags) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    	$scope.contact = Contacts.get($stateParams.contactId);
    	$scope.title = "Share Contact";
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
}]);