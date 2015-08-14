var controllers = angular.module('starter.controllers.notification.ionic', []);

controllers.controller('NotificationIonicCtrl', function($scope, ionic) {
    $scope.ionicRegisterStatus = localStorage.getItem('ionicRegisterStatus') || 'unregistered';

    $scope.ionicDevice = function(action) {
        console.log(action);

        if (action == 'register') {
            ionic.registerDevice().then(
                function(status) {
                    console.log(status);

                    $scope.ionicRegisterStatus = 'registered';
                    localStorage.setItem('ionicRegisterStatus', 'registered');
                },
                function(reason) {
                    console.log('Failed' + reason);
                }
            );
        }

        if (action == 'unregister') {
            ionic.unregisterDevice().then(
                function(status) {
                    console.log(status);

                    $scope.ionicRegisterStatus = 'unregistered';
                    localStorage.setItem('ionicRegisterStatus', 'unregistered');
                },
                function(reason) {
                    console.log('Failed' + reason);
                }
            );
        }
    }
});
