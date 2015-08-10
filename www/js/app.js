var app = angular.module('starter', [
    'ionic',
    'starter.controllers',
    'starter.services',
    'ngCordova'
])

app.run(function($ionicPlatform, pushWoosh) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }

        pushWoosh.init();
    });
})

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })
        .state('tab.camera', {
            url: '/camera',
            views: {
                'tab-camera': {
                    templateUrl: 'templates/tab-camera.html',
                    controller: 'CameraCtrl'
                }
            }
        })
        .state('tab.share', {
            url: '/share',
            views: {
                'tab-share': {
                    templateUrl: 'templates/tab-share.html',
                    controller: 'ShareCtrl'
                }
            }
        })
        .state('tab.notification', {
            url: '/notification',
            views: {
                'tab-notification': {
                    templateUrl: 'templates/tab-notification.html',
                    controller: 'NotificationCtrl'
                }
            }
        });

      $urlRouterProvider.otherwise('/tab/camera');
});

app.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.tabs.position('bottom');
});
