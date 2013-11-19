'use strict';

angular.module('youtubeWidget.directives', []).
	directive('youtubeWidgetApp', [function(){
		return {
			restrict: 'C',
			templateUrl: 'youtubeWidgetApp.html',
			controller: 'youtubeWidgetApp'
		}
	}]).
	run(function($templateCache){
		$templateCache.put('youtubeWidgetApp.html', '' +
			'<p>Widget App</p>' +
			'<input data-ng-model="query"> (I dont do anything yet)' +
			'<div class="mod-youtubeWidget">' +
				'<div class="videoPlayerWrapper">' +
					'<video-player ' +
						'data-video-id="videoId"' +
						'data-player="player"' +
					'></video-player>' +
				'</div>' +
				'<video-list ' +
					'data-videos="videos" ' +
					'data-next-page-token="nextPageToken" ' +
					'data-previous-page-token="prevPageToken"' +
					'data-player="player"' +
				'></video-list>' +
			'</div>' +
			'');
	});

angular.module('youtubeWidget.directives').
	directive('videoList', [function(){
		return {
			restrict: 'E',
			templateUrl: 'videoList.html',
			controller: 'videoList',
			scope: {
				/*
				* videos array | An array of videos to show inside the video list
				* The videos should be a youtube data api video object
				* */
				videos: '=',
				nextPageToken: '=',
				previousPageToken: '=',
				/*
				 * player object | The player object returned when a player is instantiated.
				 * The player that the API acts upon
				 * */
				player: '='
			}
		}
	}]).run(function($templateCache){
		$templateCache.put('videoList.html', '' +
				'<div class="videoList">' +
					'Video List' +
					'<p>nextPageToken: {{nextPageToken}}</p>' +
					'<p>previousePagetoken: {{previousPageToken}}</p>' +
					'<ul>' +
						'<li data-ng-repeat="video in videos" data-ng-click="playNewVideo(video.id.videoId)">{{video.snippet.title}}</li>' +
					'</ul>' +
				'</div>' +
			'');
	});

angular.module('youtubeWidget.directives').
	directive('videoPlayer', [function(){
		return {
			restrict: 'E',
			templateUrl: 'videoPlayer.html',
			controller: 'videoPlayer',
			scope: {
				/*
				* videoId string | The video to load when the player is instantiated
				* */
				videoId: '=',
				/*
				* player object | The player object returned when a player is instantiated.
				* The player that the API acts upon
				* */
				player: '='
			}
		}
	}]).run(function($templateCache){
		$templateCache.put('videoPlayer.html', '' +
			'<div class="videoPlayer">' +
				'Video Player' +
			'</div>' +
			'');
	});
