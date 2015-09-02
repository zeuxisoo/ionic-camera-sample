.PHONY: server

all:
	@echo "make install"
	@echo "make server"

install:
	npm install

	sudo npm install -g ionic
	sudo npm install -g cordova
	sudo npm install -g ios-sim
	sudo npm install -g ios-deploy

	ionic platform add android
	ionic platform add ios

	cordova plugin add com.ionic.keyboard
	cordova plugin add cordova-plugin-whitelist
	cordova plugin add cordova-plugin-camera
	cordova plugin add cordova-plugin-file
	cordova plugin add cordova-plugin-file-transfer

	cordova plugin add com.verso.cordova.clipboard

	cordova plugin add nl.x-services.plugins.socialsharing
	cordova prepare

	# Local push
	# cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications

	# Pushwoosh
	# cordova plugin add https://github.com/Pushwoosh/pushwoosh-phonegap-3.0-plugin.git

	# Parse
	# cordova plugin add https://github.com/benjie/phonegap-parse-plugin

	# Ionic Push
	npm install -g bower
	ionic add ionic-service-core
	ionic plugin add https://github.com/phonegap-build/PushPlugin.git
	ionic add ngCordova
	ionic add ionic-service-push

server:
	ionic serve

upload:
	php -S 10.0.1.6:8080 -t ./server

android: fixbug
	ionic run android

ios:
	ionic run ios --device

fixbug:
	# http://stackoverflow.com/questions/30640251/cordova-resolvelocalfilesystemurl-error-code-1000-in-android
	# https://github.com/apache/cordova-plugin-file/pull/119
	rm -rf platforms/android/src/org/apache/cordova/file/ContentFilesystem.java
	cp patches/ContentFilesystem.java platforms/android/src/org/apache/cordova/file/ContentFilesystem.java

facebook:
	cordova platform remove ios
	cordova platform remove android
	cordova platform remove browser

	cordova platform add ios
	cordova platform add android

	cordova plugin add https://github.com/Wizcorp/phonegap-facebook-plugin.git --variable APP_ID="<API_VERSION>" --variable APP_NAME="<API_VERSION>"

	bower update
