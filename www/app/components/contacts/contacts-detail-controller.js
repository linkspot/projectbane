angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', 'Contacts', 
            function($scope, $state, $stateParams, $ionicHistory, Contacts) {
    
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        forceBackButton();
    });

    $scope.$on( "$ionicView.enter", function() {
        $scope.contact = Contacts.get($stateParams.contactId);
    });

    $scope.updateContact = function() {
        Contacts.update($scope.contact);
    }

    $scope.removeContact = function() {
        Contacts.remove($scope.contact);
        $state.go('tab.contacts');
    }

    $scope.allContactsPage = function() {
        $state.go('tab.contacts');
    }

    var forceBackButton = function() {
        var history = $ionicHistory.backView();
        console.log(history);
        history.url = "/tab/contacts";
        history.stateId = "tab.contacts";
        history.stateName = "tab.contacts";
        history.title = "Contacts";
    }

}]);