'use strict';

angular.module('youtubeWidget.services', ['LocalStorageModule']).
	/*
	* @todo add a caching param to the data api look up.
	* @todo Handle http.get failure
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
							q: q
						};
						if (pageToken) {
							params.pageToken = pageToken
						}
						return $http.get(
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
				}
			};
		}];

	}]);
