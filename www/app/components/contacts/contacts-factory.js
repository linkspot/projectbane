angular.module('linkspot')

.factory('Contacts', ['$firebaseArray', function($firebaseArray) {
  // Might use a resource here that returns a JSON array
  var dataRef = new Firebase("https://linkspot.firebaseIO.com/users");
  var contacts = $firebaseArray(dataRef);

  return {
    all: function() {
      return contacts;
    },
    remove: function(contact) {
      // contacts.splice(contacts.indexOf(contact), 1);
      contacts.$remove(contact);
    },
    get: function(contactId) {
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id === parseInt(contactId)) {
          return contacts[i];
        }
      }
      return null;
    },
    add: function(contact) {
      var id = contacts.length;
      var image = contact;
      console.log(id);
      console.log(image);
      contacts.$add({
        id: id,
        face: image
      });
    }
  };

  // Some fake testing data
  // var contacts = [{
  //   id: 0,
  //   name: 'Ben Sparrow',
  //   lastText: 'You on your way?',
  //   face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  // }, {
  //   id: 1,
  //   name: 'Max Lynx',
  //   lastText: 'Hey, it\'s me',
  //   face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  // }, {
  //   id: 2,
  //   name: 'Adam Bradleyson',
  //   lastText: 'I should buy a boat',
  //   face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  // }, {
  //   id: 3,
  //   name: 'Perry Governor',
  //   lastText: 'Look at my mukluks!',
  //   face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  // }, {
  //   id: 4,
  //   name: 'Mike Harrington',
  //   lastText: 'This is wicked good ice cream.',
  //   face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  // },{
  //   id: 5,
  //   name: 'Ben Sparrow',
  //   lastText: 'You on your way?',
  //   face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  // }, {
  //   id: 6,
  //   name: 'Max Lynx',
  //   lastText: 'Hey, it\'s me',
  //   face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  // }, {
  //   id: 7,
  //   name: 'Adam Bradleyson',
  //   lastText: 'I should buy a boat',
  //   face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  // }, {
  //   id: 8,
  //   name: 'Perry Governor',
  //   lastText: 'Look at my mukluks!',
  //   face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  // }, {
  //   id: 9,
  //   name: 'Mike Harrington',
  //   lastText: 'This is wicked good ice cream.',
  //   face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  // }];

}]);
