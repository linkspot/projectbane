angular.module('linkspot')

.controller('ContactsNotesEditCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', '$ionicPopup','$ionicSideMenuDelegate', '$cordovaCamera', '$cordovaEmailComposer', '$timeout', 'Contacts', 'Camera', 'Tags', '$rootScope', 
            function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, $ionicSideMenuDelegate, $cordovaCamera, $cordovaEmailComposer, $timeout, Contacts, Camera, Tags, $rootScope) {
    
    var contactBeforeUpdate = {};

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {

        $scope.contactEdit = angular.copy(Contacts.get($stateParams.contactId));
        $scope.contactUpdate = Contacts.get($stateParams.contactId);

        console.log($scope.contactEdit);
    });


    $scope.$on( "$ionicView.enter", function() {

    });

    
    $scope.goBackToDetail = function() {
        $state.go('contacts-detail', { "contactId": $scope.contactEdit.id });
    }

    $scope.updateContactNotes = function() {
        $scope.contactUpdate.notes = $scope.contactEdit.notes;
        Contacts.update($scope.contactUpdate);
        $state.go('contacts-detail', { "contactId": $scope.contactEdit.id });
    }


    $scope.toggleRightSideMenu = function() {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.profile = function() {
        $state.go('profile');
    };

    $scope.logout = function() {
        $state.go('login');
    };

    $scope.$ionicGoBack = function() {
        $state.go('contacts-detail', { "contactId": $scope.contactEdit.id });
        console.log($scope.contactEdit);

    };



}]);
