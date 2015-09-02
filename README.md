# Ionic Camera Sample

Base sample project for my testing on ionic with camera plugin

## Install

    make install

## Run project on android

    make run

## Notification

Note. Please install the related dependencies in the Makefile before make changes

Currently. The default enabled dependency is Ionic push service

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

### Ionic Service

Register the app to ionic service

    cd /path/to/project
    ionic io init

        Email: <YOUR_EMAIL>
        Password: <YOUR_PASSWORD>

Register the `API key`

    ionic push --google-api-key <YOUR_GOOGLE_API_KEY>

Register the `GCM key`

    ionic config set gcm_key <YOUR_GCM_PROJECT_NUMBER>

Add Premission in `platforms/android/AndroidManifest.xml`

    <uses-permission android:name="android.permission.INTERNET" />

Test push notification using REST API

- Can be <ENTER> without password

        curl -u <YOUR_SECRET_KEY> \
        -H "Content-Type: application/json" \
        -H "X-Ionic-Application-Id: <YOUR_APP_ID>" \
        -d '{
            "tokens": [
                "<DEVICE_TOKEN>"
            ],
            "notification": {
                "alert": "This is a test message."
            }
        }' \
        https://push.ionic.io/api/v1/push

Check the push notification status in queue

    curl -u <YOUR_SECRET_KEY> \
    -H "Content-Type: application/json" \
    -H "X-Ionic-Application-Id: <YOUR_APP_ID>" \
    https://push.ionic.io/api/v1/status/<MESSAGE_ID>

## Facebook login

1. Enter to developer page and create app

		https://developers.facebook.com
	
2. Go to Dashboard, Get `App ID` and `API Version`
3. Edit `Makefile`

		cordova plugin add https://github.com/Wizcorp/phonegap-facebook-plugin.git --variable APP_ID="<API_VERSION>" --variable APP_NAME="<API_VERSION>"
		
4. Run Makefile

		make facebook
		
5. Enter to developer Dashboard > Settings

	- Website
		
			http://example.com
			
	- Android
		
		- Google Play Package Name
			
				Find at /path/to/project/platforms/android/AndroidManifest.xml -> package="com.ionicframework.xxxxxxx"
				
		- Class Name
				
				MainActivity
				
		- Key Hashes

			1. check the `APP_NAME` is or not exists in current keystore alias list

					keytool -list -v -keystore ~/.android/debug.keystore
	
			2. create the alias if you can not found `APP_NAME` in alias list (default password `android`)

					keytool -genkey -v -keystore ~/.android/debug.keystore -alias <APP_NAME> -keyalg RSA -keysize 2048 -validity 10000
					
			3. fill all information the create alias
			
			4. open the `build.json` in project root
			
			5. update the previous information in `debug` section for `ionic run android`

			6. get the key hash from `APP_NAME` alias

					keytool -exportcert -alias <APP_NAME> -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
			
## Problem

Can not upload when using iOS

	Please make sure the upload_max_filesize is more than your photo size, and the upload/log.txt error is 0.
