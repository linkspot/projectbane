// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in all files with 'factory' in the name
// 'starter.controllers' is found in all files with 'controller' in the name
angular.module('linkspot', ['ionic', 'ngCordova', 'firebase'])

.run(function($ionicPlatform, $ionicSideMenuDelegate, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    document.addEventListener('touchstart', function (event) {
      // workaround for Android
      if ($ionicSideMenuDelegate.isOpenLeft()) {
          event.preventDefault();
      }
      if ($ionicSideMenuDelegate.isOpenRight()) {
          event.preventDefault();
      }
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('profile', {
    // cache: false,
    url: '/profile',
    templateUrl: 'app/components/user/tab-profile.html',
    controller: 'ProfileCtrl'
  })
  .state('contacts', {
    url: '/contacts',
    templateUrl: 'app/components/contacts/views/tab-contacts.html',
    controller: 'ContactsCtrl'
  })
  .state('contacts-detail', {
    cache: false,
    url: '/contacts/:contactId',
    templateUrl: 'app/components/contacts/views/contacts-detail.html',
    controller: 'ContactsDetailCtrl'
  })
  .state('contacts-detail-edit', {
    url: '/contacts/:contactId/edit',
    templateUrl: 'app/components/contacts/views/contacts-detail-edit.html',
    controller: 'ContactsDetailEditCtrl'
  })
  .state('contacts-detail-notes', {
    url: '/contacts/:contactId/notes',
    templateUrl: 'app/components/contacts/views/contacts-detail-notes.html',
    controller: 'ContactsDetailEditCtrl'
  })
  .state('contacts-share-email', {
    url: '/contacts/:contactId/share',
    templateUrl: 'app/components/contacts/views/contacts-share-email.html',
    controller: 'ContactsShareEmailCtrl'
  })
  .state('intro', {
    url: '/',
    templateUrl: 'app/components/intro/intro.html',
    controller: 'IntroCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/components/user/signup.html',
    controller: 'SignupController'
  })
  .state('login', {
     url: '/login',
     templateUrl: 'app/components/user/login.html',
     controller: 'LoginController'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});

