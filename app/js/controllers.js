'use strict';

angular.module('youtubeWidget.controllers', []).
	/*
	* Primary controller for our app.
	* The youtube-widget-app directive should be responsible for "Bootstrapping" our app.
	* */
	controller('youtubeWidgetApp', ['$scope', 'videoSearch', '$http', function($scope, vs, $http){
		var videoList;
		$scope.videos = {};
		$scope.query = 'Test';
		$scope.nextPageToken = '';
		$scope.prevPageToken = '';
		$scope.player = null;

		/*
		* Get our first list of videos
		* */
		videoList = vs.search($scope.query);
		videoList.then(function(data){
			if (0 < data.data.items.length) {
				$scope.videos = data.data.items;
				$scope.videoId = data.data.items[0].id.videoId;
				$scope.nextPageToken = data.data.nextPageToken;
				$scope.nextPageToken = data.data.nextPageToken;
			}
			/*
			* Get our second list of videos ... beware of RACE conditions "I live my live one ajax call at a time"
			* @todo load more button function
			* */
			videoList = vs.search($scope.query, $scope.nextPageToken);
			videoList.then(function(data){
//				console.log(data.data);
				$scope.videos = data.data.items;
				$scope.nextPageToken = data.data.nextPageToken;
				$scope.prevPageToken = data.data.prevPageToken;
			});
		});
	}]).
	/*
	* Controller related to the video list directive.
	* */
	controller('videoList', ['$scope', '$element', 'videoPlayer', function($scope, $element, videoPlayer){
		// Binding for buttons like load more and ???
		$scope.playNewVideo = function(id){
			videoPlayer.playNewVideo($scope.player, id);
		}
	}]).
	/*
	* Controller related to the video player directive.
	* */
	controller(
		'videoPlayer', ['$scope', '$window', '$element', 'videoPlayer',
		function($scope, $window, $element, videoPlayer){
			$scope.$on('videoPlayer:apiReady', function(){
				$scope.player = videoPlayer.createPlayer($element[0], 'yrAhGfrxaUo');
				$scope.$apply($scope.player);
			});
			$scope.$on('videoPlayer:playerReady', function(){
				// @todo This should be instanced with the player or queued without auto play
//				videoPlayer.playNewVideo($scope.videoId);
			});
	}]);
