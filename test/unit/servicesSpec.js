describe('Service Spec', function(){
	"use strict";
	beforeEach(module('youtubeWidget.services'));
	describe("Service: youtubeSearch", function () {

		it("Should have the correct API Key (else a new one via Google\'s API console maybe be needed).",
			inject(function(youtubeSearch){
			expect(youtubeSearch.getKey()).toBe('AIzaSyAd5GLH7ep_QXp6o5MP6AUVo1wN3hZrOT4');
		}));
	});
});


/*
* POC/dev
* */
angular.module('widget', []).
	provider('withPrivate', [function(){
		var query = 'First';
		this.demo = 'Third';
		this.setQuery = function(newQuery){
			query = newQuery;
		};
		this.$get = [function(){
			return {
				getQuery: function(){
					return query;
				}
			};
		}];
	}]);

describe('Widget: withPrivate', function(){
	"use strict";
	var p;
	beforeEach(module('widget', function(withPrivateProvider){
		p = withPrivateProvider;
	}));
	it('Var query, default value', inject(function(withPrivate){
		// Default value
		expect(withPrivate.getQuery()).toBe('First');
	}));
	it('Member demo, private', inject(function(withPrivate){
		expect(p.demo).toBe('Third');
	}));
	it('Method setQuery, private', inject(function(withPrivate){
		var val = 'Second';
		p.setQuery(val);
		expect(withPrivate.getQuery()).toBe(val);
	}));
});
