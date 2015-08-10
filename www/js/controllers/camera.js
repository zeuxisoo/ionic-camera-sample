var controllers = angular.module('starter.controllers.camera', []);

controllers.controller('CameraCtrl', function(ucfirst, inArray, $scope, $timeout, $cordovaCamera, $cordovaFileTransfer, $ionicLoading) {
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
            destinationType : Camera.DestinationType.FILE_URI,
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

        $cordovaCamera.getPicture(options).then(function(imageData) {
            window.resolveLocalFileSystemURL(imageData, function(fileEntry) {
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

        var previewImage     = $scope.previewImage,
            previewImageData = previewImageSelector.guillotine('getData');

        var server   = encodeURI("http://10.0.1.6:8080/upload.php"),
            filePath = previewImage,
            options  = {
                fileKey: "file",
                fileName   : previewImage.substr(previewImage.lastIndexOf('/') + 1),
                mimeType   : "image/jpeg",
                chunkedMode: false,
                headers    : { Connection: "close" },
                params     : {
                    access_token    : 'YOUR_TOKEN_HERE',
                    check_it_out    : 'Sure',
                    crop_image_angle: previewImageData.angle,
                    crop_image_h    : previewImageData.h,
                    crop_image_scale: previewImageData.scale,
                    crop_image_w    : previewImageData.w,
                    crop_image_x    : previewImageData.x,
                    crop_image_y    : previewImageData.y
                }
            }

        $ionicLoading.show({
            template: 'Uploading ...'
        });

        $cordovaFileTransfer.upload(server, filePath, options).then(
            function(result) {
                console.log("Code = " + result.responseCode);
                console.log("Response = " + result.response);
                console.log("Sent = " + result.bytesSent);

                $ionicLoading.hide();
            },
            function(error) {
                console.log("An error has occurred: Code = " + error.code);
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);

                $ionicLoading.hide();
            },
            function(progress) {
                console.log(progress);
            }
        );
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
