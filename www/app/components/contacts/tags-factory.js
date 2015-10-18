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
        }
        // Shouldn't use $remove() - refer to link for more information.
        // https://www.firebase.com/docs/web/guide/understanding-data.html#section-arrays-in-firebase
        // remove: function(tag) {
        //     contacts.$remove(tag);
        // }
    };

}]);
