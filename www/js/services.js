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
    if (typeof window.cordova === "undefined") {
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
    if (typeof window.cordova === "undefined") {
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
