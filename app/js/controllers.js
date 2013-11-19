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

		/*
		* Get our first list of videos
		* */
		videoList = vs.search($scope.query);
		videoList.then(function(data){
			if (0 < data.data.items.length) {
//				console.log(data.data);
				$scope.videos = data.data.items;

				$scope.nextPageToken = data.data.nextPageToken;
				$scope.nextPageToken = data.data.nextPageToken;
//				console.log($scope.videos);

			}
			/*
			* Get our second list of videos ... beware of RACE conditions "I live my live one ajax call at a time"
			* */
			videoList = vs.search($scope.query, $scope.nextPageToken);
			videoList.then(function(data){
				console.log(data.data);
				$scope.videos = data.data.items;
				$scope.nextPageToken = data.data.nextPageToken;
				$scope.prevPageToken = data.data.prevPageToken;
			});
		});

		console.log('Test Controller: Last thing inside the controller.');
	}]).
	/*
	* Controller related to the video list directive.
	* */
	controller('videoList', ['$scope', '$element', function($scope, $element){
		// Binding for buttons like load more and ???
	}]).
	/*
	* Controller related to the video player directive.
	* */
	controller(
		'videoPlayer', ['$scope', '$window', '$element', 'videoPlayer',
		function($scope, $window, $element, videoPlayer){
			var player;
			/*
			* Youtube player loaded call back
			* */
			videoPlayer.setElement($element[0]);
 			player = $window.onYouTubeIframeAPIReady = videoPlayer.onYouTubeIframeAPIReady;

			/*
			* Asynchronously load the youtube player
			* */
			$script('https://www.youtube.com/iframe_api', function(){
				console.log('playerJS LOADED');
			});
			$scope.title = 'I am a player.';
	}]);
