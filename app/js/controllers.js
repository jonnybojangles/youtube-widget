'use strict';

angular.module('youtubeWidget.controllers', []).
	/*
	* Primary controller for our app.
	* */
	controller('youtubeWidgetApp', ['$scope', function($scope){
		$scope.videos = [];
		// @todo make this a configure
		$scope.query = 'Test';
		$scope.player = null;
		$scope.videoMeta = {
			videoId: '',
			title: '',
			description: '',
			nextPageToken: '',
			prevPageToken: ''
		};
		/*
		* Flags for activation CSS
		* */
		$scope.isError = false;
		$scope.isPlayerActive = false;
		$scope.isListActive = false;
	}]).
	/*
	* Controller related to the video list directive.
	* */
	controller('videoList',
		['$scope', '$element', 'videoPlayer', 'videoSearch', '$anchorScroll',
		function($scope, $element, videoPlayer, videoSearch, $anchorScroll){
		/*
		* Call the videoSearch service and set up the promise success/resolve
		* */
		function search(query, nextPage){
			var videoList;
			videoList = videoSearch.search(query, nextPage);
			videoList.then(function(data){
				parseVideoList(data);
			});
		}
		/*
		* Check for valid data
		* @todo this check should be in the video search service
		* Set the video meta data for the app
		* Remove the load/see more button if there are no more results left
		* Set list active flag for app
		* */
		function parseVideoList(data){
			/*
			* Check if the data is in an expected format and that there are actually videos
			* */
			if (
				0 < data.hasOwnProperty('data')
					&& 'youtube#searchListResponse' === data.data.kind
					&& 0 < data.data.items.length
				) {
				$scope.videos = videoSearch.mergeVideoLists($scope.videos, data.data.items);
				$scope.videoMeta.videoId = $scope.videoMeta.videoId || $scope.videos[0].id.videoId;
				$scope.videoMeta.title = $scope.videos[0].snippet.title;
				$scope.videoMeta.description = $scope.videos[0].snippet.description;
				$scope.videoMeta.nextPageToken = data.data.nextPageToken;
				$scope.videoMeta.nextPageToken = data.data.nextPageToken;
				// Remove the load more button if there are no more pages
				if (!data.data.nextPageToken) {
					angular.element($element[0].querySelector('.loadMore')).remove();
				}
				$scope.isListActive = true;
			} else {
				$scope.isError = true;
				// @todo Video search service should handle error, try, catches, etc
				console.log('Error: youtube-widget: videoList: failed to get video results.');
			}
		}
		/*
		* Search with a next page token
		* */
		function loadMore(){
			search($scope.query, $scope.videoMeta.nextPageToken);
		}
		/*
		* When a list item is clicked load the associated video.
		* */
		function listItemClicked(video){
			videoPlayer.playNewVideo($scope.player, video.id.videoId);
			$scope.videoMeta.videoId = video.id.videoId;
			$scope.videoMeta.title = video.snippet.title;
			$scope.videoMeta.description = video.snippet.description;
			$anchorScroll('videoPlayerTop');
		}
		/*
		* expose events to the template
		* */
		$scope.loadMore = loadMore;
		$scope.listItemClicked = listItemClicked;
		/*
		 * Get our first list of videos
		 * */
		search($scope.query);
	}]).
	/*
	* Controller related to the video player directive.
	* */
	controller(
		'videoPlayer', ['$scope', '$window', '$element', 'videoPlayer',
		function($scope, $window, $element, videoPlayer){
			var apiPromise,
				playerPromise;
			/*
			* Load video player and set up promise resolve/success
			* What for an update/observe for a change to videoId (required to init video player)
			* Create player and set up its promise resolve/success
			* Flag player as active for app
			* */
			apiPromise = videoPlayer.init();
			apiPromise.then(function(){
				$scope.$watch('videoMeta.videoId', function(){
					if (!!$scope.videoMeta.videoId) {
						playerPromise = videoPlayer.createPlayer($element[0], $scope.videoMeta.videoId);
						playerPromise.then(function(player){
							$scope.player = player;
							$scope.isPlayerActive = true;
						});
					}
				});
			});
	}]);
