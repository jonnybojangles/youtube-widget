// include angular loader, which allows the files to load in any order
/*
 AngularJS v1.0.7
 (c) 2010-2012 Google, Inc. http://angularjs.org
 License: MIT
 */
(function(i){'use strict';function d(c,b,e){return c[b]||(c[b]=e())}return d(d(i,"angular",Object),"module",function(){var c={};return function(b,e,f){e&&c.hasOwnProperty(b)&&(c[b]=null);return d(c,b,function(){function a(a,b,d){return function(){c[d||"push"]([a,b,arguments]);return g}}if(!e)throw Error("No module: "+b);var c=[],d=[],h=a("$injector","invoke"),g={_invokeQueue:c,_runBlocks:d,requires:e,name:b,provider:a("$provide","provider"),factory:a("$provide","factory"),service:a("$provide","service"),
	value:a("$provide","value"),constant:a("$provide","constant","unshift"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:h,run:function(a){d.push(a);return this}};f&&h(f);return g})}})})(window);


// include a third-party async loader library
/*!
 * $script.js v1.3
 * https://github.com/ded/script.js
 * Copyright: @ded & @fat - Dustin Diaz, Jacob Thornton 2011
 * Follow our software http://twitter.com/dedfat
 * License: MIT
 */
!function(a,b,c){function t(a,c){var e=b.createElement("script"),f=j;e.onload=e.onerror=e[o]=function(){e[m]&&!/^c|loade/.test(e[m])||f||(e.onload=e[o]=null,f=1,c())},e.async=1,e.src=a,d.insertBefore(e,d.firstChild)}function q(a,b){p(a,function(a){return!b(a)})}var d=b.getElementsByTagName("head")[0],e={},f={},g={},h={},i="string",j=!1,k="push",l="DOMContentLoaded",m="readyState",n="addEventListener",o="onreadystatechange",p=function(a,b){for(var c=0,d=a.length;c<d;++c)if(!b(a[c]))return j;return 1};!b[m]&&b[n]&&(b[n](l,function r(){b.removeEventListener(l,r,j),b[m]="complete"},j),b[m]="loading");var s=function(a,b,d){function o(){if(!--m){e[l]=1,j&&j();for(var a in g)p(a.split("|"),n)&&!q(g[a],n)&&(g[a]=[])}}function n(a){return a.call?a():e[a]}a=a[k]?a:[a];var i=b&&b.call,j=i?b:d,l=i?a.join(""):b,m=a.length;c(function(){q(a,function(a){h[a]?(l&&(f[l]=1),o()):(h[a]=1,l&&(f[l]=1),t(s.path?s.path+a+".js":a,o))})},0);return s};s.get=t,s.ready=function(a,b,c){a=a[k]?a:[a];var d=[];!q(a,function(a){e[a]||d[k](a)})&&p(a,function(a){return e[a]})?b():!function(a){g[a]=g[a]||[],g[a][k](b),c&&c(d)}(a.join("|"));return s};var u=a.$script;s.noConflict=function(){a.$script=u;return this},typeof module!="undefined"&&module.exports?module.exports=s:a.$script=s}(this,document,setTimeout);

/*
* Load style sheets via this script
* */
(function(d){
	"use strict";
	var defaultSheet,
		styleSheets = [
			'',
			'./css/youtube-widget.css',
			'http://fonts.googleapis.com/css?family=Roboto:400,100'
		],
		loadCSS = function(path){
			var head  = d.getElementsByTagName('head')[0],
				link  = d.createElement('link');
			link.rel  = 'stylesheet';
			link.type = 'text/css';
			link.href = path;
			link.media = 'all';
			head.appendChild(link);
		};
// @todo Could be used to load CSS with script to avoid server request.
//		createCSSheet = function(){
//			// Create the <style> tag
//			var style = d.createElement("style");
//			// WebKit
//			style.appendChild(d.createTextNode(""));
//			d.head.appendChild(style);
//			return style.sheet;
//		};
//	defaultSheet = createCSSheet();
//	defaultSheet.insertRule('', 0);
	styleSheets.forEach(loadCSS);

})(document);


/*
* Load app dependencies and boot strap it
* @todo build all these files into one file
* */
(function(d){
	var ws = d.querySelector('.youtube-widget-app'),
		loadApp = function(element){
			"use strict";
			$script([
				'lib/angular/angular.js',
				'lib/angular-local-storage/angular-local-storage.js',
				'js/app.js',
				'js/controllers.js',
				'js/directives.js',
				'js/services.js'
			], function() {
				angular.bootstrap(element, ['youtubeWidget']);
			});
		};
	if (ws) {
		loadApp(ws);
	} else {
		// Create a place for our app
		var docFrag = d.createDocumentFragment(),
			div = d.createElement('div'),
			body = d.getElementsByTagName('body')[0];
		div.setAttribute('id', 'dynamicYoutubeWidget');
		div.setAttribute('class', 'youtube-widget-app');
		docFrag.appendChild(div);
		body.appendChild(docFrag);
		loadApp(d.getElementById('dynamicYoutubeWidget'));
	}
})(document);
;'use strict';

angular.module('youtubeWidget',[
	'youtubeWidget.services',
	'youtubeWidget.directives',
	'youtubeWidget.controllers'
]);;'use strict';

angular.module('youtubeWidget.services', ['LocalStorageModule']).
	/*
	* @todo add a caching bool to the data api look up.
	* @todo Handle http.get failure
	* @todo add methods to maintain a video list and append to and remove from it
	* */
	provider('videoSearch', [function(){
		/*
		* Object related to the youtube dataAPI
		* baseURI | location of the api
		* key | the google apis key used for this app
		* */
		this.api = {
			baseURI: 'https://www.googleapis.com/youtube/v3/search',
			key: 'AIzaSyAd5GLH7ep_QXp6o5MP6AUVo1wN3hZrOT4'
		};
		/*
		* Cache prefix for this service
		* */
		this.cachePrefix = 'vs';
		/*
		* query string | The search query that will be used to find videos
		* */
		this.defaultQueryString = 'Oculus';
		this.maxResults = 10;
		/*
		* Our service
		* */
		this.$get = ['$q', 'localStorageService', '$http', function($q, ls, $http){
			var api = this.api,
				maxResults = this.maxResults,
				cachePrefix = this.cachePrefix,
				defaultQueryString = this.defaultQueryString,
				/*
				* Create a cache key from the cache prefix
				* */
				cacheKey = function(key, pageToken){
					key = key || '';
					pageToken = pageToken || '';
					return cachePrefix + '-' +  key + '-' + pageToken;
				};

			return {
				/*
				* Search the youtube data api for youtube videos related to a query
				* @param q | string The query, not required
				* @param pageToken | string the pageToken string from the previous request
				* */
				search: function(q, pageToken){
					q = q || defaultQueryString;
					var key = cacheKey(q, pageToken),
						result = ls.get(key);
					/*
					* If not cached look it up and cache it.
					* */
					if (null === result) {
						var params = {
							part: 'snippet',
							type: 'video',
							key: api.key,
							maxResults: maxResults,
							q: q,
							callback: 'JSON_CALLBACK'
						};
						if (pageToken) {
							params.pageToken = pageToken
						}
						return $http.jsonp(
							api.baseURI, {params: params}).
							/*
							 * When promise completes cache the return.
							 * Return the data so the consumer can use the promise as well
							 * @todo refactor this out into a testable method (separation of concerns).
							 * @todo What about on failure? Alert the app.
							 * */
							then(function(httpData){
								ls.add(key, httpData);
								return httpData;
							});
					} else {
						return $q.when(result);
					}
				},
				mergeVideoLists: function(a, b){
					return a.concat(b);
				}
			};
		}];
	}]).
	/*
	* This video player service is designed for youtube iframe player api.
	* @todo refactor and or create a facade to work with multiple players.
	* @todo document available events playerReady and apiReady
	* */
	factory('videoPlayer', ['$q', '$window', function($q, $window){
		var player,
			isApiIncluded = false,
			isApiReadyPromise,
			isPlayerReadyPromise,
			onPlayerReady = function(){
				isPlayerReadyPromise.resolve(player);
			},
			onYouTubeIframeAPIReady = function(){
				isApiReadyPromise.resolve();
			},
			onPlayerStateChange = function(){},
			createPlayer = function(element, videoId){
				isPlayerReadyPromise = $q.defer();
				player = new $window.YT.Player(element, {
//					height: '390',
//					width: '640',
					videoId: videoId,
					events: {
						'onReady': onPlayerReady
						// 'onStateChange': onPlayerStateChange
					}
				});
				return isPlayerReadyPromise.promise;

			},
			loadPlayerAPI = function(){
				// @todo call once
				// @todo document this dependency on the app's async loader?
				$script('https://www.youtube.com/iframe_api', function(){
					isApiIncluded = true;
				});
			};
		return {
			callOnPlayerReady: onPlayerReady, // exposed for testing ?
			callOnPlayerStateChange: onPlayerStateChange, // exposed  for testing ?
			createPlayer: createPlayer,
			playNewVideo: function(player, id, timeStart, suggestedQuality){
				if (player) {
					// @todo mobile testing on cue, vs load, vs auto play
					player.cueVideoById(id, timeStart, suggestedQuality);
					player.playVideo();

				}
			},
			init: function(){
				isApiReadyPromise = $q.defer();
				loadPlayerAPI();
				$window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
				return isApiReadyPromise.promise;
			}
		}
	}]);
;'use strict';

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
				'<!--[if IE]>' +
				'<div class="ie">' +
				'<![endif]-->' +
					'<div class="mod-wrapper">' +
						'<div class="row-wrapper">' +
							'<div class="mainCol">' +
								'<div class="content">' +
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
								'</div>' +
							'</div>' +
							'<div class="listWrapper">' +
								'<div class="sidebar">' +
									'<div class="sidebar-content">' +
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
						'</div>' +
					'</div>' +
				'<!--[if IE]>' +
				'</div>' +
				'<![endif]-->' +
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
;'use strict';

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
