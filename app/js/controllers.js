'use strict';

angular.module('youtubeWidget.controllers', []).
	/*
	* Primary controller for our app.
	* The youtube-widget-app directive should be responsible for "Bootstrapping" our app.
	* */
	controller('youtubeWidgetApp', ['$scope', 'videoSearch', '$timeout', function($scope, vs, $timeout){
		var videoList;
		$scope.videos = [];
		$scope.query = 'Test';
		$scope.nextPageToken = '';
		$scope.prevPageToken = '';
		$scope.player = null;
		$scope.videoId = null;
		$scope.isPlayerActive = false;
		$scope.isListActive = false;

		function parseVideoList(data){
			console.log(data);
			if (
					0 < data.hasOwnProperty('data')
					&& 'youtube#searchListResponse' === data.data.kind
					&& 0 < data.data.items.length
				) {
				$scope.videos = vs.mergeVideoLists($scope.videos, data.data.items);
				$scope.videoId = $scope.videoId || $scope.videos[0].id.videoId;
				$scope.nextPageToken = data.data.nextPageToken;
				$scope.nextPageToken = data.data.nextPageToken;
				$scope.isListActive = true;
//				$scope.$apply($scope.isListActive);
			}
		}

		/*
		* Get our first list of videos
		* */
		videoList = vs.search($scope.query);
		videoList.then(function(data){
			// Simulate long call
			$timeout(
				function(){
					parseVideoList(data);
					/*
					 * Get our second list of videos ... beware of RACE conditions "I live my live one ajax call at a time"
					 * @todo load more button function
					 * */
					videoList = vs.search($scope.query, $scope.nextPageToken);
					videoList.then(function(data){
						parseVideoList(data);
					});
				}, 1000
			);

		});
	}]).
	/*
	* Controller related to the video list directive.
	* */
	controller('videoList', ['$scope', '$element', 'videoPlayer', function($scope, $element, videoPlayer){
		// Binding for buttons like load more and ???
//		$scope.playNewVideo = function(id){
//			videoPlayer.playNewVideo($scope.player, id);
//		}
		$scope.listItemClick = function(event){
			var element = angular.element(event.srcElement);
			console.log(element);
			console.log(element.attr('data-video-id'));
			videoPlayer.playNewVideo($scope.player, element.attr('data-video-id'));
		};
	}]).
	/*
	* Controller related to the video player directive.
	* */
	controller(
		'videoPlayer', ['$scope', '$window', '$element', 'videoPlayer', '$timeout', '$q',
		function($scope, $window, $element, videoPlayer, $timeout, $q){
			var ApiPromise = videoPlayer.init();
			var playerPromise = $q.defer().promise;

			ApiPromise.then(function(){
				console.log('Player API is Ready');
				$scope.$watch('videoId', function(){
					if (!!$scope.videoId) {
						playerPromise = videoPlayer.createPlayer($element[0], $scope.videoId);
						playerPromise.then(function(player){
							console.log('Player Player is Ready');
							$scope.player = player;
						});
					}
				});
			});




//			loadPlayer();
			// Api ready and video list ready
//			$scope.$on('videoPlayer:apiReady', function(){
//				isApiReady = true;
//			});
			$scope.$on('videoPlayer:playerReady', function(){
				$scope.isPlayerActive = true;
				$scope.$apply($scope.isPlayerActive);
				// @todo This should be instanced with the player or queued without auto play
//				videoPlayer.playNewVideo($scope.videoId);
			});
	}]);
