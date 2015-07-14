<?php
$targetFolder    = "uploads/";

$status  = 1;
$message = "";

$check = getimagesize($_FILES["file"]["tmp_name"]);

if($check !== false) {
    $message = "File is an image - " . $check["mime"] . ".";
    $status = 1;
} else {
    $message = "File is not an image.";
    $status = 0;
}

switch($check["mime"]) {
    case "image/gif":
        $imageFileType = "gif";
        break;
    case "image/jpeg":
    case "image/jpg":
        $imageFileType = "jpg";
        break;
    case "image/png":
        $imageFileType = "png";
        break;
    case "image/bmp":
        $imageFileType = "bmp";
        break;
    default:
        exit(json_encode([
            'status' => 0,
            'message' => "Not supported type of image"
        ]));
        break;
}

$targetFile = $targetFolder.time().'.'.$imageFileType;

if (file_exists($targetFile)) {
    $message = "Sorry, file already exists.";
    $status = 0;
}

if ($_FILES["file"]["size"] > 500000) {
    $message = "Sorry, your file is too large.";
    $status = 0;
}

if(in_array($imageFileType, ["jpg", "png", "jpeg", "gif"]) === false) {
    $message = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $status = 0;
}


if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
    $message = "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.";
} else {
    $message = "Sorry, there was an error uploading your file.";
}

echo json_encode([
    'status'  => $status,
    'message' => $message,

    // POST
    'access_token' => $_POST['access_token'],
    'check_it_out' => $_POST['check_it_out']
]);
