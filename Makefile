all:
	@echo "make install"
	@echo "make server"

install:
	ionic platform add android

	cordova plugin add com.ionic.keyboard
	cordova plugin add cordova-plugin-camera
	cordova plugin add cordova-plugin-file
	cordova plugin add cordova-plugin-whitelist
	cordova plugin add cordova-plugin-file-transfer

server:
	ionic serve

upload:
	php -S 192.168.31.112:8080 -t ./server

run: fixbug
	ionic run android

fixbug:
	# http://stackoverflow.com/questions/30640251/cordova-resolvelocalfilesystemurl-error-code-1000-in-android
	# https://github.com/apache/cordova-plugin-file/pull/119
	rm -rf platforms/android/src/org/apache/cordova/file/ContentFilesystem.java
	cp patches/ContentFilesystem.java platforms/android/src/org/apache/cordova/file/ContentFilesystem.java
