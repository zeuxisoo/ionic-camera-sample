var controllers = angular.module('starter.controllers', []);

controllers.controller('CameraCtrl', function($scope, $cordovaCamera, $ionicLoading) {

    $scope.previewImage = 'http://placehold.it/1280x760/555/FFF?text=Preview';

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
            $scope.previewImage = imageData;
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
            $scope.previewImage = imageURI;

            window.resolveLocalFileSystemURL(imageURI, function(fileEntry) {
                console.log(fileEntry);
                console.log(fileEntry.toURL());

                $scope.previewImage = fileEntry.toURL();
            }, function(error){
                console.log(error);
            });
        }, function(error) {
            console.error(error);
        });
    }

    $scope.uploadPhoto = function() {
        $ionicLoading.show({
            template: 'Uploading ...'
        });

        var previewImage      = $scope.previewImage;
        var fileUploadOptions = new FileUploadOptions();
        var fileTransfer      = new FileTransfer();

        fileUploadOptions.fileKey     = "file";
        fileUploadOptions.fileName    = previewImage.substr(previewImage.lastIndexOf('/') + 1);
        fileUploadOptions.mimeType    = "image/jpeg";
        fileUploadOptions.chunkedMode = true;
        fileUploadOptions.chunkedMode = false;
        fileUploadOptions.headers     = { Connection: "close" };
        fileUploadOptions.params      = {
            access_token: 'YOUR_TOKEN_HERE',
            check_it_out: 'Sure'
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

});