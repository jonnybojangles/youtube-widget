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
				'<div class="mainCol">' +
					'<a name="videoPlayerTop"></a>' +
					'<p ' +
						'class="fade appTitle" ' +
						'data-ng-class="{fadeIn: videos}"' +
					'>' +
						'{{query}} YouTube Videos' +
					'</p>' +
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
						'<div data-video-player ' +
							'data-video-meta="videoMeta"' +
							'data-player="player"' +
							'data-is-player-active="isPlayerActive"' +
						'></div>' +
					'</div>' +
					'<h2 class="videoTitle">{{videoMeta.title}}</h2>' +
					'<p class="videoDescription">{{videoMeta.description}}</p>' +
					'<div class="listWrapper">' +
					'<div data-video-list ' +
						'data-videos="videos" ' +
						'data-player="player"' +
						'data-query="query"' +
						'data-is-error="isError"' +
						'data-is-list-active="isListActive"' +
						'data-video-meta="videoMeta"' +
					'></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'');
	});

angular.module('youtubeWidget.directives').
	directive('videoList', [function(){
		return {
			restrict: 'A',
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
					'<ul class="items">' +
						'<li ' +
							'class="item"' +
							'data-ng-repeat="video in videos" ' +
							'data-ng-click="listItemClicked(video)"' +
						'>' +
							'<div class="row">' +
								'<div class="cell"' +
								'>' +
									'<img ' +
										'data-ng-src="{{video.snippet.thumbnails.default.url}}" ' +
									'/> ' +
								'</div>' +
								'<div class="cell">' +
									'{{video.snippet.title}}' +
								'</div>' +
							'</div>' +
						'</li>' +
						'<li ' +
							'class="loadMore item fade" ' +
							'data-ng-class="{fadeIn: videos}" ' +
							'data-ng-click="loadMore()"' +
						'>' +
							'<div class="row">' +
								'<div class="cell">' +
									'See More' +
								'</div>' +
							'</div>' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'');
	});

angular.module('youtubeWidget.directives').
	directive('videoPlayer', [function(){
		return {
			restrict: 'A',
			template: '<div></div>',
			controller: 'videoPlayer',
			scope: {
				videoMeta: '=',
				player: '=',
				isPlayerActive: '='
			}
		}
	}]);
