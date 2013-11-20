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
			'<div class="mod-youtubeWidget" ' +
				'data-ng-class="{playerActive: isPlayerActive, listActive: isListActive, error: isError}"' +
			'>' +
				'<p>{{query}} YouTube Videos</p>' +
				'<div class="videoPlayerWrapper">' +
					'<div class="mod-spinner">' +
						'<div class="bar1"></div>' +
						'<div class="bar2"></div>' +
						'<div class="bar3"></div>' +
						'<div class="bar4"></div>' +
						'<div class="bar5"></div>' +
						'<div class="bar6"></div>' +
						'<div class="bar7"></div>' +
						'<div class="bar8"></div>' +
						'<div class="bar9"></div>' +
						'<div class="bar10"></div>' +
						'<div class="bar11"></div>' +
						'<div class="bar12"></div>' +
					'</div>' +
					'<video-player ' +
						'data-video-meta="videoMeta"' +
						'data-player="player"' +
						'data-is-player-active="isPlayerActive"' +
					'></video-player>' +
				'</div>' +
				'<div class="listWrapper">' +
					'<h2 class="videoTitle">{{videoMeta.title}}</h2>' +
					'<p class="videoDescription">{{videoMeta.description}}</p>' +
					'<video-list ' +
					'data-videos="videos" ' +
					'data-player="player"' +
					'data-query="query"' +
					'data-is-error="isError"' +
					'data-is-list-active="isListActive"' +
					'data-video-meta="videoMeta"' +
					'></video-list>' +
				'</div>' +
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
				videos: '=',
				player: '=',
				isError: '=',
				query: '=',
				isListActive: '=',
				videoMeta: '='
			}
		}
	}]).run(function($templateCache){
		$templateCache.put('videoList.html', '' +
				'<div class="videoList">' +
					'<ul>' +
						'<li ' +
							'data-ng-repeat="video in videos" ' +
							'data-ng-click="listItemClick($event)"' +
							'data-video-id="{{video.id.videoId}}"' +
							'data-video-title="{{video.snippet.title}}"' +
							'data-video-description="{{video.snippet.description}}"' +
						'>' +
							'<img data-ng-src="{{video.snippet.thumbnails.default.url}}" /> ' +
							'{{video.snippet.title}}' +
						'</li>' +
						'<li class="loadMore" data-ng-click="loadMore()">See More</li>' +
					'</ul>' +
				'</div>' +
			'');
	});

angular.module('youtubeWidget.directives').
	directive('videoPlayer', [function(){
		return {
			restrict: 'E',
			template: '<div></div>',
			controller: 'videoPlayer',
			scope: {
				videoMeta: '=',
				player: '=',
				isPlayerActive: '='
			}
		}
	}]);
