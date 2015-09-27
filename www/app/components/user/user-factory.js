angular.module('linkspot')

.factory('Users', ['$firebaseArray', function($firebaseArray) {
  // Might use a resource here that returns a JSON array
  // TODO: needs to somehow find the user id of the logged in user.
  var dataRef = new Firebase("https://linkspot.firebaseIO.com/users");
  var users = $firebaseArray(dataRef);

  return {
  	getFirebaseRef: function() {
  		return dataRef;
  	},
    all: function() {
      return users;
    },
    remove: function(user) {
      // users.splice(users.indexOf(user), 1);
      users.$remove(user);
    },
    get: function(userId) {

      for (var i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
          return users[i];
        }
      }
      return null;
    },
    add: function(id, name, email) {

      console.log(id);
      console.log(name);
      console.log(email);
      users.$add({
        id: id,
        name: name,
        email: email
      });

    }
  };

}]);
