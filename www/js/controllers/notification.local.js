var controllers = angular.module('starter.controllers.notification.local', []);

controllers.controller('NotificationLocalCtrl', function($scope, $cordovaLocalNotification) {
    $scope.notifyLocalNotification = function(notification) {
        console.log(notification);

        $cordovaLocalNotification.schedule({
            id: 1,
            title: notification.title,
            text: notification.text
        }).then(function(result) {
            console.log(result);
        });
    }
});
