describe('Service Tests', function(){
	beforeEach(function () {
		"use strict";
		// Including this test suits dependencies
		module('youtubeWidget'); // e.g. module('youtubeWidget.factories');

	});

	/*
	* Testing providers module
	* */
	describe('youtubeWidget.providers', function(){
		it('should verify true is true', function(){
			expect(true).toBe(true);
		});
	});

	/*
	* Testing factory module
	* */
	describe("youtubeWidget.factories", function () {
		"use strict";
		it('Make sure widgetname\'s name is properly hardcoded.', inject(function(widgetName){
			expect(widgetName.name).toBe('YouTube Widget');
		}));
	});


});

/*
* Testing a controller created with angular.module().controller
* */
describe('youtubeWidget.controllers', function(){
	"use strict";
	beforeEach(module('youtubeWidget.controllers'));
	describe('mainCtrl', function(){
		it('Test hardcoded scope variables are correctly hardcoded.', inject(function($rootScope, $controller){
			var scope = $rootScope.$new(),
				ctrl = $controller('mainCtrl', { $scope: scope });
			expect(scope.test).toBe('this is a test');
		}));
	});
});

describe('youtubeWidget.providers', function(){
	beforeEach(function () {
		module('youtubeWidget.providers');
	});

	describe("Day provider", function () {
		"use strict";
		it('Testing providers day method default', inject(function(day){
			expect(day.day).toBe('day');
		}));
	});

	describe("Day setDay", function () {
		"use strict";
		beforeEach(function () {
			module(function(dayProvider){
				"use strict";
				dayProvider.setDay('Bilbo');
			});
		});
		it('Testing providers setDay method', inject(function(day){
			expect(day.day).toBe('Bilboday');
		}));
	});
});


angular.module('widget', []).
	factory('widgetVersion', function(){
		return {
			version: '0.123'
		}
	});
/*
* Extend widget, sans []s
* */
angular.module('widget').
	config(function($provide){
		$provide.factory('widgetDate', function(){
			return {
				date: 'Today'
			}
		});
	});
describe('Test widget', function(){
	"use strict";
	beforeEach(module('widget'));
	/*
	 * Testing a factory
	 * */
	describe('widgetVersion', function(){
		"use strict";
		it('Make sure the widget version is correct.', inject(function(widgetVersion){
			expect(widgetVersion.version).toBe('0.123');
		}));
	});

	/*
	 * Testing config (factory)
	 * */
	describe("widgetDate", function () {
		"use strict";
		it("Does the widget date match our expect value?", inject(function(widgetDate){
			expect(widgetDate.date).toBe('Today')
		}));
	});
});
