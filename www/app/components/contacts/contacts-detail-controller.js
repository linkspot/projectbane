angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', '$cordovaCamera', 'Contacts', 'Camera', 
            function($scope, $state, $stateParams, $ionicHistory, $cordovaCamera, Contacts, Camera) {
    
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        forceBackButton();
    });

    $scope.$on( "$ionicView.enter", function() {
        $scope.contact = Contacts.get($stateParams.contactId);
    });
    
    // Modify Data
    $scope.toggleEditMode = function() {
        console.log("edit mode");
    }

  	$scope.updateContact = function() {
      console.log($scope.contact);
  		Contacts.update($scope.contact);
  	}
    $scope.removeContact = function() {
        Contacts.remove($scope.contact);
        $state.go('tab.contacts');
    }

    // Update Business Card.
    $scope.showContactActionSheet = function() {
        Camera.showActionSheet($scope.setContactPicture);
    }

    $scope.setContactPicture = function(options, contact) {
        $cordovaCamera.getPicture(options)
        .then(function(imageData) {
            if(imageData != null) {
                var imageSrc = "data:image/jpeg;base64," + imageData;
                $scope.contact.card = imageSrc;
                Contacts.update($scope.contact);
            }
        }, 
        function(err) {
            alert(err);
        })
        .then(function() {
            $state.go($state.current, {}, {reload: true});
        });
    }

    // Back Button.
    var forceBackButton = function() {
        var history = $ionicHistory.backView();
        // console.log(history);
        history.url = "/tab/contacts";
        history.stateId = "tab.contacts";
        history.stateName = "tab.contacts";
        history.title = "Contacts";
    }

}]);