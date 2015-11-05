// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in all files with 'factory' in the name
// 'starter.controllers' is found in all files with 'controller' in the name
angular.module('linkspot', ['ionic', 'ngCordova', 'firebase'])

.run(function($ionicPlatform) {
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
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/shared/tabs/tabs.html'
  })

  // Each tab has its own nav history stack:
  // .state('tab.profile', {
  //   cache: false,
  //   url: '/profile',
  //   views: {
  //     'tab-profile': {
  //       templateUrl: 'app/components/user/tab-profile.html',
  //       controller: 'ProfileCtrl'
  //     }
  //   }
  // })
  // .state('tab.contacts', {
  //     url: '/contacts',
  //     views: {
  //       'tab-contacts': {
  //         templateUrl: 'app/components/contacts/tab-contacts.html',
  //         controller: 'ContactsCtrl'
  //       }
  //     }
  //   })
  //   .state('tab.contacts-detail', {
  //     url: '/contacts/:contactId',
  //     views: {
  //       'tab-contacts': {
  //         templateUrl: 'app/components/contacts/contacts-detail.html',
  //         controller: 'ContactsDetailCtrl'
  //       }
  //     }
  //   })
  // .state('tab.camera', {
  //   url: '/camera',
  //   views: {
  //     'tab-camera': {
  //       templateUrl: 'app/components/camera/tab-camera.html',
  //       controller: 'CameraCtrl'
  //     }
  //   }
  // })
  .state('profile', {
    // cache: false,
    url: '/profile',
    templateUrl: 'app/components/user/tab-profile.html',
    controller: 'ProfileCtrl'
  })
  .state('contacts', {
    url: '/contacts',
    templateUrl: 'app/components/contacts/tab-contacts.html',
    controller: 'ContactsCtrl'
  })
  .state('contacts-detail', {
    url: '/contacts/:contactId',
    templateUrl: 'app/components/contacts/contacts-detail.html',
    controller: 'ContactsDetailCtrl'
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

