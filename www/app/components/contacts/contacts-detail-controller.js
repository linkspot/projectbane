angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', '$ionicSideMenuDelegate', '$cordovaCamera', 'Contacts', 'Camera', 'Tags', 
            function($scope, $state, $stateParams, $ionicHistory, $ionicSideMenuDelegate, $cordovaCamera, Contacts, Camera, Tags) {
    
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        forceBackButton();
    });

    $scope.$on( "$ionicView.enter", function() {
        $scope.contact = Contacts.get($stateParams.contactId);
        $scope.title = $scope.contact.name;

        // $scope.selectedTags = $scope.contact.tags;
        // $scope.tags = Tags.all();
    });
    
    // Modify Tags
    $scope.toggleRightSideMenu = function() {
        $scope.updateRightMenuTitle();
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.updateRightMenuTitle = function() {
        if($ionicSideMenuDelegate.isOpenRight())
            $scope.title = $scope.contact.name;
        else
            $scope.title = "Select Tags";
    };

    $scope.isSelected = function(tag) {
        // console.log(tag);
        return true;
    }

  	// Contact
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