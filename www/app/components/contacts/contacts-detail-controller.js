angular.module('linkspot')

.controller('ContactsDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicHistory', '$ionicSideMenuDelegate', '$cordovaCamera', 'Contacts', 'Camera', 'Tags', 
            function($scope, $state, $stateParams, $ionicHistory, $ionicSideMenuDelegate, $cordovaCamera, Contacts, Camera, Tags) {
    
    // $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    //     viewData.enableBack = true;
    //     forceBackButton();
    // });
    $scope.name = "Temp";

    $scope.$on( "$ionicView.enter", function() {
        $scope.contact = Contacts.get($stateParams.contactId);
        $scope.name = $scope.contact.name;
        $scope.title = $scope.name;

        $scope.selectedTags = $scope.contact.tags;
        if ($scope.selectedTags == null)
            $scope.selectedTags = [];
        $scope.tags = Tags.all();
    });

    $scope.$watch(
        function () {
            return $ionicSideMenuDelegate.isOpenRight();
        },
        function (isOpen) {
            if (isOpen)
                $scope.title = "Select Tags";
            else
                $scope.title = $scope.name;           
        }
    );
    
    // Modify Tags
    $scope.toggleRightSideMenu = function() {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.isSelected = function(tag) {
        return _.contains($scope.selectedTags, tag);
    }

    $scope.toggleSelectTag = function(tag) {
        var index = _.indexOf($scope.selectedTags, tag);
        if (index != -1)
            $scope.selectedTags.splice(index, 1);
        else
            $scope.selectedTags.push(tag);
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
    // var forceBackButton = function() {
    //     console.log($ionicHistory.currentView());
    //     var history = $ionicHistory.backView();
        
    //     history.url = "/tab/contacts";
    //     history.stateId = "tab.contacts";
    //     history.stateName = "tab.contacts";
    //     history.title = "Contacts";

    //     console.log(history);
    // }

}]);