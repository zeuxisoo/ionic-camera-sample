var controllers = angular.module('starter.controllers.notification.pushwoosh', []);

controllers.controller('NotificationPushwooshCtrl', function($scope, pushWoosh) {
    $scope.pushWooshRegisterStatus = localStorage.getItem('pushWooshRegisterStatus') || 'unregistered';

    $scope.pushWooshDevice = function(action) {
        console.log(action);

        if (action == 'register') {
            pushWoosh.registerDevice().then(
                function(status) {
                    console.log(status);

                    $scope.pushWooshRegisterStatus = 'registered';
                    localStorage.setItem('pushWooshRegisterStatus', 'registered');
                },
                function(reason) {
                    console.log('Failed' + reason);
                }
            );
        }

        if (action == 'unregister') {
            pushWoosh.unregisterDevice().then(
                function(status) {
                    console.log(status);

                    $scope.pushWooshRegisterStatus = 'unregistered';
                    localStorage.setItem('pushWooshRegisterStatus', 'unregistered');
                },
                function(reason) {
                    console.log('Failed' + reason);
                }
            );
        }
    }
});
