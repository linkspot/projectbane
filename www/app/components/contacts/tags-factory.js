angular.module('linkspot')

.factory('Tags', ['$firebaseArray', 'Users', function($firebaseArray, Users) {
    var userId = Users.get().$id;
    var dataRef = new Firebase("https://linkspot.firebaseIO.com/users/" + userId + "/tags");
    var tags = $firebaseArray(dataRef);

    return {
        all: function() {
            return tags;
        },
        add: function(tag) {
            tags.$add(tag);
        },
        update: function(tags) {
            contacts.$save(tags);
        },
        remove: function(tag) {
            contacts.$remove(tag);
        }
    };

}]);
