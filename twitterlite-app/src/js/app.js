'use strict';

angular.module('twitterlite', ['ngRoute']).config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/', { controller: 'ViewAllCtrl', templateUrl: 'tpl/AllMessages.html' })
        .when('/user/:username', { controller: 'ViewByUserCtrl', templateUrl: 'tpl/MessagesByUser.html' })
        .when('/mention/:username', { controller: 'ViewByMentionedUserCtrl', templateUrl: 'tpl/MessagesByMentionedUser.html' })
        .when('/hashtag/:hashtag', { controller: 'ViewByUserHashtag', templateUrl: 'tpl/MessagesByHashtag.html' })
        .otherwise({ redirectTo: '/' });
}])
.controller('AppCtrl', ['$scope', function ($scope) {
    
}])
.controller('ViewAllCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.username = '';
    $scope.content = '';
    $scope.tweets = [];
    var offset;
    var limit;

    $scope.init = function init(){
        offset = 0;
        limit = 25;

        $http({
            method: 'GET',
            url: 'http://localhost:8080/twitterlite/messages',
            params: {
                offset: offset,
                limit: limit
            }
        })
        .success(function(data, status, headers, config) {
            $scope.tweets = data;
            offset = offset + data.length;
        }).
        error(function(data, status, headers, config) {
        });
    };

    $scope.post = function post(){
    	$http({
            method: 'POST',
            url: 'http://localhost:8080/twitterlite/tweets',
            data: $.param({
                username: $scope.username,
                content: $scope.content
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data, status, headers, config){
            var newTweet = {username: $scope.username, content: $scope.content};
            $scope.tweets.unshift(newTweet);

            $scope.username = '';
            $scope.content = '';
    	})
    	.error(function(data, status, headers, config){
    	});
    };

    $scope.getMoreTweets = function getMoreTweets(){
        $http({
            method: 'GET',
            url: 'http://localhost:8080/twitterlite/messages',
            params: {
                offset: offset,
                limit: limit
            }
        })
        .success(function(data, status, headers, config) {
            $scope.tweets = $scope.tweets.concat(data);
            offset = offset + data.length;
        }).
        error(function(data, status, headers, config) {
        });
    };
}])
.controller('ViewByUserCtrl', ['$scope', function ($scope) {
    
}])
.controller('ViewByMentionedUserCtrl', ['$scope', function ($scope) {
    
}])
.controller('ViewByUserHashtag', ['$scope', function ($scope) {
    
}]);