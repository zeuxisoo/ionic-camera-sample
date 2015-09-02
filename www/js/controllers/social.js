var controllers = angular.module('starter.controllers.social', []);

controllers.controller('SocialCtrl', function($scope, $cordovaFacebook) {

    $scope.signInFacebook = function() {
        $cordovaFacebook
            .login(["public_profile", "email", "user_friends"])
            .then(
                function(success) {
                    console.log(success);
                },
                function(reason) {
                    console.log(reason);
                }
            );
    }

});
