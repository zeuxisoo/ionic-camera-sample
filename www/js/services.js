var services = angular.module('starter.services', []);

services.factory('ucfirst', function() {
    return function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

services.factory('inArray', function() {
    return function(wordArray, word) {
        return wordArray.indexOf(word) !== -1;
    }
});

services.factory('pushWoosh', ['$q', function($q) {
    var loaded = true;

    try {
        cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
    }catch(e) {
        loaded = false;
    }

    if (typeof window.cordova === "undefined" || loaded === false) {
        console.warn('Please run on real device when you want to test notification');

        return {
            init: function() {},
            registerDevice: function() {}
        }
    }else{
        var pushNotification      = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
        var PushWoosh             = function() {};
        var PUSHWOOSH_APP_ID      = '<PUSHWOOSH_APP_ID>';
        var GOOGLE_PROJECT_NUMBER = '<GOOGLE_PROJECT_NUMBER>';

        PushWoosh.prototype.init = function() {
            // iOS
            if (device.platform == "iPhone" || device.platform == "iOS") {
                document.addEventListener('push-notification', function(event) {
                    console.log(event.notification);

                    pushNotification.setApplicationIconBadgeNumber(0);
                });

                pushNotification.onDeviceReady({
                    pw_appid: PUSHWOOSH_APP_ID
                });

                pushNotification.setApplicationIconBadgeNumber(0);
            }

            // Android
            if (device.platform == "Android") {
                document.addEventListener('push-notification', function(event) {
                    var title    = event.notification.title,
                        userData = event.notification.userdata;

                    if(typeof(userData) != "undefined") {
                        console.warn('user data: ' + JSON.stringify(userData));
                    }

                    console.log(title);
                });

                pushNotification.onDeviceReady({
                    pw_appid : PUSHWOOSH_APP_ID,
                    projectid: GOOGLE_PROJECT_NUMBER,
                });
            }
        }

        PushWoosh.prototype.registerDevice = function() {
            var q = $q.defer();

            pushNotification.registerDevice(
                function(status) {
                    if (device.platform == "Android") {
                        console.log('DeviceToken: ' + status);
                    }

                    if (device.platform == "iPhone" || device.platform == "iOS") {
                        console.log('DeviceToken: ' + status['deviceToken']);
                    }

                    q.resolve(status);
                },
                function(status) {
                    console.warn('Failed: ' + JSON.stringify(status));
                    q.reject(status);
                }
            );

            return q.promise;
        }

        PushWoosh.prototype.unregisterDevice = function() {
            var q = $q.defer();

            pushNotification.unregisterDevice(
                function(status) {
                    q.resolve(status);
                },
                function(status) {
                    q.reject(status);
                }
            );

            return q.promise;
        }

        return new PushWoosh();
    }
}]);

services.factory('parse', ['$q', function($q) {
    if (typeof window.cordova === "undefined" || typeof window.parsePlugin === "undefined") {
        console.warn('Please run on real device when you want to test notification');

        return {
            init: function() {},
            subscribe: function() {},
            unsubscribe: function() {},
        }
    }else{
        var appId    = '<APP_ID>';
        var clientId = '<CLIENT_ID>';
        var channel  = '<CHANNEL>';

        var Parse = function() {};

        Parse.prototype.init = function() {
            var q = $q.defer();

            parsePlugin.initialize(appId, clientId, function(status) {
                q.resolve(status);
            }, function(reason) {
                q.reject(reason);
            });

            return q.promise;
        }

        Parse.prototype.subscribe = function() {
            var q = $q.defer();

            parsePlugin.subscribe(channel, function(status) {
                q.resolve(status);
            }, function(reason) {
                q.reject(reson);
            })

            return q.promise;
        }

        Parse.prototype.unsubscribe = function() {
            var q = $q.defer();

            parsePlugin.unsubscribe(channel, function(status) {
                q.resolve(status);
            }, function(reason) {
                q.reject(reson);
            })

            return q.promise;
        }

        return new Parse();
    }
}]);

services.factory('ionic', ['$q', '$rootScope', '$ionicUser', '$ionicPush', function($q, $rootScope, $ionicUser, $ionicPush) {
    if (typeof window.cordova === "undefined") {
        console.warn('Please run on real device when you want to test notification');

        return {
            init: function() {},
            registerDevice: function() {},
            unregisterDevice: function() {}
        }
    }else{
        var Ionic = function() {};

        Ionic.prototype.init = function() {
            $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
                console.log("Successfully registered token " + data.token);
                console.log('Ionic Push: Got token ', data.token, data.platform);
            });
        }

        Ionic.prototype.registerDevice = function() {
            var q    = $q.defer();
            var user = $ionicUser.get();

            if(!user.user_id) {
                user.user_id = $ionicUser.generateGUID();
            }

            angular.extend(user, {
                name: 'Anonymous',
                bio: 'I am anonymous user'
            });

            $ionicUser.identify(user).then(function() {
                user_id: $ionicUser.generateGUID()
            }).then(function(userData) {
                console.log(userData);

                $ionicPush.register({
                    canShowAlert       : true,
                    canSetBadge        : true,
                    canPlaySound       : true,
                    canRunActionsOnWake: true,
                    onNotification     : function(notification) {
                        console.log("onNotification -> ");
                        console.log(notification);
                        return true;
                    }
                }, userData).then(
                    function(status) {
                        q.resolve(status);
                    },
                    function(reason) {
                        q.reject(reason);
                    }
                );
            });

            return q.promise;
        }

        Ionic.prototype.unregisterDevice = function() {
            return $ionicPush.unregister();
        }

        return new Ionic();
    }
}]);
