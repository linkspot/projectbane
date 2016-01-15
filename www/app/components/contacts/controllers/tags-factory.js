angular.module('linkspot')

.factory('Tags', ['$firebaseArray', 'Users', function($firebaseArray, Users) {
    var userId = Users.get().$id;
    var dataRef = new Firebase("https://linkspot.firebaseIO.com/users/" + userId + "/tags");
    var tags = $firebaseArray(dataRef);

    return {
        all: function() {
            return tags;
        },
        allTrimmed: function() {
            var trimmedTags = [];
            dataRef.on('value', function(snap) { trimmedTags = snap.val(); });
            return trimmedTags;
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
