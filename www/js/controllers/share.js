var controllers = angular.module('starter.controllers.share', []);

controllers.controller('ShareCtrl', function($scope, $ionicPopup, $ionicLoading, $cordovaSocialSharing, $cordovaClipboard) {
    var popIt = function(title, message, error) {
        $ionicLoading.hide();

        return $ionicPopup.alert({
            title: title,
            template: message
        }).then(function(result) {
            if (error) {
                console.log(error);
            }
            console.log(result);
        });
    }

    $scope.shareFacebook = function() {
        $ionicLoading.show({
            template: 'Sharing ...'
        });

        $cordovaSocialSharing
            .shareViaFacebook(
                "This is a test message",
                "https://pbs.twimg.com/media/CJ4SBPUVAAA-8kN.png",
                "https://www.example.com/"
            ).then(function(result) {
                popIt('Success', 'Share success');
            }, function(error) {
                popIt('Error', 'Share failed', error);
            });
    }

    $scope.shareNormal = function() {
        $ionicLoading.show({
            template: 'Sharing ...'
        });

        $cordovaSocialSharing
            .share(
                "This is a test message",
                "Subject it",
                "https://pbs.twimg.com/media/CJ4SBPUVAAA-8kN.png",
                "https://www.example.com/"
            ).then(function(result) {
                popIt('Success', 'Share success');
            }, function(err) {
                popIt('Error', 'Share failed', err);
            });
    }

    $scope.share = {
        url: ""
    };

    $scope.copy = function(share) {
        console.log(share);

        if (share.url === "") {
            popIt('Error', 'Please enter url first');
        }else{
            $cordovaClipboard
                .copy(share.url)
                .then(function () {
                    popIt('Success', 'Copy success');
                }, function () {
                    popIt('Error', 'Copy failed');
                });
        }
    }
});
