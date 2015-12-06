angular.module('linkspot')

.factory('Contacts', ['$firebaseArray', 'Users', function($firebaseArray, Users) {
    var userId = Users.get().$id;
    var dataRef = new Firebase("https://linkspot.firebaseIO.com/users/" + userId + "/contacts");
    var contacts = $firebaseArray(dataRef);

    return {
        all: function() {
            return contacts;
        },
        companies: function() {
            var companies = {};
            dataRef.once("value", function(snapshot) {
                // The callback function will get called once for each contact.
                snapshot.forEach(function(childSnapshot) {
                    // This will return the contact's unique id.
                    var key = childSnapshot.key();
                    // Will return the actual contact data.
                    var contact = childSnapshot.val();

                    if (companies[contact.company] == undefined) {
                        companies[contact.company] = [];
                    }  
                    companies[contact.company].push(contact);
                });
            });

            return companies;
        },
        add: function(imageSrc) {
            // TODO: store largest number id instead. Right now, ids can be reused if contact is deleted
            var lastId = contacts.length - 1;
            var currId = 0;
            if (lastId >= 0) currId = contacts[lastId].id + 1;
            var image = imageSrc;
            contacts.$add({
                id: currId,
                card: image,
                notes: ""
            });
            return currId;
        },
        get: function(contactId) {
            for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].id === parseInt(contactId)) {
                    return contacts[i];
                }
            }
            return null;
        },
        update: function(contact) {
            contacts.$save(contact);
        },
        remove: function(contact) {
            // contacts.splice(contacts.indexOf(contact), 1);
            contacts.$remove(contact);
        }
    };

}]);
