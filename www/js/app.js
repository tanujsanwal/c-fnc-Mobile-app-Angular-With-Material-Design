// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngMaterial'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    Parse.initialize("54exU9DzVeENPnZNbZqpGU4zahjMSjtX4n1eBrdj", "750gkZi44Duq1nLSc9uHexdRz3SaRVAOA0TtcJ5L");


    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })


    .state('app.login', {
      url: "/login",
      views: {
        'menuContent': {
          templateUrl: "templates/login.html",
          controller: 'logCtrl'
        }
      }
    })
    .state('app.addcard', {
      url: "/addcard",
      views: {
        'menuContent': {
          templateUrl: "templates/addcard.html",
          controller: 'addcardCtrl'
        }
      }
    })
      .state('app.historyDemo', {
        url: "/historyDemo/:id",
        views: {
          'menuContent': {
            templateUrl: "templates/historyDemo.html",
            controller: 'historyCtrl'
          }
        }
      })


      .state('app.home', {
        url: "/home",
        views: {
          'menuContent': {
            templateUrl: "templates/test.html",
            controller: 'homeCtrl'

          }
        }
      })


  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
