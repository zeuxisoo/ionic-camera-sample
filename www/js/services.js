var services = angular.module('starter.services', []);

services.factory('ucfirst', function() {
    return function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

services.factory('inArray', function() {
    return function(wordArray, word) {
        return wordArray.indexOf(word) !== -1;
    }
});
