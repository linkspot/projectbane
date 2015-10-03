angular.module('linkspot')

.factory('Users', ['$firebaseArray', function($firebaseArray) {
  	var dataRef = new Firebase("https://linkspot.firebaseIO.com/users");
  	var users = $firebaseArray(dataRef);
    var userId = "";

  	function authDataCallback(authData) {
  		if (authData) {
    		console.log("User ID = " + authData.uid + " is logged in with " + authData.provider);
    		userId = authData.uid;
  		} else {
    		console.log("User is logged out");
  		}
  	}

  	dataRef.onAuth(authDataCallback);
  	console.log("User ID = " + userId);
  // if user logged in, get current user id
  // if signed up or logged in, create function in controller, then create function to get id from controller

  return {
  	add: function(id, name, email) {
		console.log(id);
		console.log(name);
		console.log(email);
		users.$add({
			id: id,
			name: name,
			email: email
		});
    },
    all: function() {
      	return users;
    },

    get: function() {
      	for (var i = 0; i < users.length; i++) {
        	if (users[i].id === userId) {
          		return users[i];
        	}
      	}
        return null;
    },
  	getFirebaseRef: function() {
  		return dataRef;
  	},
    remove: function(user) {
        // users.splice(users.indexOf(user), 1);
        users.$remove(user);
    },
    setUserId: function(userId, callback) {
  		userId = userId;
  		authDataCallback;
  		callback();
    },
    update: function(user) {
        users.$save(user);
    }
  };

}]);
