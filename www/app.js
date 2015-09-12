// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('linkSpot', ['ionic', 'firebase', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider
      .state('tabs', {
         url: '/tab',
         abstract: true,
         templateUrl: 'templates/tabs.html'
      })
      .state('tabs.profile', {
         url: '/profile',
         views: {
            'profile-tab': {
               templateUrl: 'accounts/profile.html',
               controller: 'ProfileController'
            }
         }
      })
      .state('tabs.list', {
         url: '/list',
         views: {
            'list-tab': {
               templateUrl: 'contacts/list.html',
               controller: 'ListController'
            }
         }
      })
      .state('tabs.detail', {
         url: '/list/:cId',
         views: {
            'list-tab': {
               templateUrl: 'contacts/list-detail.html',
               controller: 'ListController'
            }
         }
      })
      .state('tabs.camera', {
         url: '/camera',
         views: {
            'camera-tab': {
               templateUrl: 'qr-code/qr-scanner.html',
               controller: 'BarcodeController'
            }
         }
      })
      .state('signup', {
         url: '/signup',
         templateUrl: 'accounts/signup.html',
         controller: 'SignupController'
      })
      .state('login', {
         url: '/login',
         templateUrl: 'accounts/login.html',
         controller: 'LoginController'
      })
      .state('qrCode', {
         url: '/qrCode',
         templateUrl: 'qr-code/qrcode.html',
         controller: 'qrController'
      });
      $urlRouterProvider.otherwise('/login');
});






