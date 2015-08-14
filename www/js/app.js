var app = angular.module('starter', [
    'ionic',
    'ionic.service.core',
    'ionic.service.push',
    'starter.controllers',
    'starter.services',
    'ngCordova'
])

app.run(function($ionicPlatform, pushWoosh, parse, ionic) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }

        pushWoosh.init();
        parse.init();
        ionic.init();
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
        })
        .state('tab.notification_local', {
            url: '/notification/local',
            views: {
                'tab-notification': {
                    templateUrl: 'templates/notification-local.html',
                    controller : 'NotificationLocalCtrl'
                }
            }
        })
        .state('tab.notification_pushwoosh', {
            url: '/notification/pushwoosh',
            views: {
                'tab-notification': {
                    templateUrl: 'templates/notification-pushwoosh.html',
                    controller : 'NotificationPushwooshCtrl'
                }
            }
        })
        .state('tab.notification_parse', {
            url: '/notification/parse',
            views: {
                'tab-notification': {
                    templateUrl: 'templates/notification-parse.html',
                    controller : 'NotificationParseCtrl'
                }
            }
        })
        .state('tab.notification_ionic', {
            url: '/notification/ionic',
            views: {
                'tab-notification': {
                    templateUrl: 'templates/notification-ionic.html',
                    controller : 'NotificationIonicCtrl'
                }
            }
        });

      $urlRouterProvider.otherwise('/tab/camera');
});

app.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.tabs.position('bottom');
});
