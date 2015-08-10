var controllers = angular.module('starter.controllers.notification.parse', []);

controllers.controller('NotificationParseCtrl', function($scope, parse) {
    $scope.parseSubscribeStatus = localStorage.getItem('parseSubscribeStatus') || 'unsubscribed';

    $scope.parseDevice = function(action) {
        console.log(action);

        if (action == 'subscribe') {
            parse.subscribe().then(
                function(status) {
                    console.log(status);

                    $scope.parseSubscribeStatus = 'subscribed';
                    localStorage.setItem('parseSubscribeStatus', 'subscribed');
                },
                function(reason) {
                    console.log('Failed' + reason);
                }
            );
        }

        if (action == 'unsubscribe') {
            parse.unsubscribe().then(
                function(status) {
                    console.log(status);

                    $scope.parseSubscribeStatus = 'unsubscribed';
                    localStorage.setItem('parseSubscribeStatus', 'unsubscribed');
                },
                function(reason) {
                    console.log('Failed' + reason);
                }
            );
        }
    }
});
