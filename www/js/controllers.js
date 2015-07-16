var controllers = angular.module('starter.controllers', []);

controllers.controller('CameraCtrl', function(ucfirst, inArray, $scope, $timeout, $cordovaCamera, $ionicLoading) {
    // Prepare scope
    $scope.previewImage = 'http://placehold.it/400x300/555/FFF?text=Preview';

    // Init guillotine
    var previewImageSelector    = $('.preview-image'),
        cropPreviewImageOptions = {
            width: 400,
            height: 300,
        }

    // Scope function
    $scope.takePhoto = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.FILE_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            // allowEdit : true,
            // encodingType: Camera.EncodingType.JPEG,
            // popoverOptions: CameraPopoverOptions,
            // targetWidth: 500,
            // targetHeight: 500,
            // saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $ionicLoading.show({
                template: 'Rendering ...'
            });

            $scope.previewImage = imageData;

            $timeout(function() {
                previewImageSelector.guillotine('remove');
                previewImageSelector.guillotine(cropPreviewImageOptions);
                previewImageSelector.guillotine('fit');
                $ionicLoading.hide();
            }, 1000);
        }, function(error) {
            console.error(error);
        });
    }

    $scope.selectPhoto = function() {
        var options = {
            quality : 75,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG
        };

        $cordovaCamera.getPicture(options).then(function(imageURI) {
            window.resolveLocalFileSystemURL(imageURI, function(fileEntry) {
                console.log(fileEntry);
                console.log(fileEntry.toURL());

                $ionicLoading.show({
                    template: 'Rendering ...'
                });

                $scope.previewImage = fileEntry.toURL();

                $timeout(function() {
                    previewImageSelector.guillotine('remove');
                    previewImageSelector.guillotine(cropPreviewImageOptions);
                    previewImageSelector.guillotine('fit');

                    $ionicLoading.hide();
                }, 1000);
            }, function(error){
                console.log(error);
            });
        }, function(error) {
            console.error(error);
        });
    }

    $scope.uploadPhoto = function() {
        if (/placehold\.it/.test(previewImageSelector.prop('src'))) {
            return;
        }

        var previewImageData  = previewImageSelector.guillotine('getData');
        var previewImage      = $scope.previewImage;
        var fileUploadOptions = new FileUploadOptions();
        var fileTransfer      = new FileTransfer();

        $ionicLoading.show({
            template: 'Uploading ...'
        });

        fileUploadOptions.fileKey     = "file";
        fileUploadOptions.fileName    = previewImage.substr(previewImage.lastIndexOf('/') + 1);
        fileUploadOptions.mimeType    = "image/jpeg";
        fileUploadOptions.chunkedMode = true;
        fileUploadOptions.chunkedMode = false;
        fileUploadOptions.headers     = { Connection: "close" };
        fileUploadOptions.params      = {
            access_token   : 'YOUR_TOKEN_HERE',
            check_it_out   : 'Sure',
            crop_image_data: previewImageData
        };

        fileTransfer.upload(
            previewImage,
            encodeURI("http://192.168.31.112:8080/upload.php"),
            function(result) {
                console.group("Success");
                console.log("Code = " + result.responseCode);
                console.log("Response = " + result.response);
                console.log("Sent = " + result.bytesSent);
                console.groupEnd();
            },
            function(error) {
                console.group("Error");
                console.log("An error has occurred: Code = " + error.code);
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);
                console.groupEnd();
            },
            fileUploadOptions
        )

        $ionicLoading.hide();
    }

    $scope.rotate = function(direction) {
        console.log(direction);
        previewImageSelector.guillotine('rotate' + ucfirst(direction));
    }

    $scope.zoom = function(direction) {
        if (inArray(['in', 'out'], direction) === true) {
            console.log(direction);
            previewImageSelector.guillotine('zoom' + ucfirst(direction));
        }else{
            console.log(direction);
            previewImageSelector.guillotine(direction);
        }
    }

});

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
