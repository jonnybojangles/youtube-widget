'use strict';

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
