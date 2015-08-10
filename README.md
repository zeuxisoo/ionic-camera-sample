# Ionic Camera Sample

Base sample project for my testing on ionic with camera plugin

## Install

    make install

## Run project on android

    make run

## Notification

### PushWhoosh

When using the `PushWhoosh`, Please edit the `services.js` file first

    var PUSHWOOSH_APP_ID      = '<PUSHWOOSH_APP_ID>';
    var GOOGLE_PROJECT_NUMBER = '<GOOGLE_PROJECT_NUMBER>';

About the `PushWoosh App ID`

    1. Go to the website and Create account
    2. Create project in control panel
    4. Enter to the project, you can get the `Application Code`

About the `Google Project Number`

    1. Go to the google developer console
    2. Create new project
    3. When project created, you can see the `project number`

About the `GSM API Key`

    1. Go to `API > Google Cloud Messaging for Android` and enable it
    2. Go to `APIs & auth > Credentials > Public API access > Create new key (Server key) > leave the box blank > Create`

And the last step

    1. Go the the Pushwoosh control panel
    2. Enter to the project
    3. Go to the project `configure` section
    4. Add the `GSM API Key` in Android section

### Parse

When using the `Parse`, Please edit the `services.js` file first

    var appId    = '<APP_ID>';
    var clientId = '<CLIENT_ID>';
    var channel  = '<CHANNEL>';

About the `App Id` and `Client Id`

    1. Go to the parse website and Create the application
    2. Go to `Application > Settings > Keys`

About the `Channel`

    You can custom which channel you want to subscribe.
    Because the push notification can specify which channel to push.

    E.g. Camera, MyApp and etc

About the `GSM` or `APNs` API Key

    1. Go to `Application > Settings > Push`
    2. Submit the API and Certs which platform you want to push

Test push notification using REST API

    curl -X POST \
    -H "X-Parse-Application-Id: <APPLICATION_ID>" \
    -H "X-Parse-REST-API-Key: <REST_API_KEY>" \
    -H "Content-Type: application/json" \
    -d '{
        "channels": [
          "Camera"
        ],
        "data": {
          "alert": "The a test message using the rest api."
        }
      }' \
      https://api.parse.com/1/push

## Problem

Can not upload when using iOS

	Please make sure the upload_max_filesize is more than your photo size, and the upload/log.txt error is 0.
