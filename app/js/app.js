'use strict';

angular.module('youtubeWidget',[
	'youtubeWidget.directives',
	'youtubeWidget.factories',
	'youtubeWidget.config',
	'youtubeWidget.providers'
]);

angular.module('youtubeWidget.controllers', []).
	controller('mainCtrl', ['$scope', function($scope){
		$scope.test = 'this is a test';

	}]);

angular.module('youtubeWidget.directives', []).
	directive('youtubeWidgetApp', ['widgetName', 'widgetByLine', 'day', function(widgetName, widgetByLine, day){
		return {
			restrict: 'C',
			template: '<p>' +
				'This is a directive test: {{test}}' +
				'</p>' +
				'<div data-ng-transclude></div>',
			transclude: true,
			controller: function($scope, $element, $attrs, $transclude) {
				$scope.test = 'Test Complete';
				$scope.name = widgetName.name;
				$scope.by = widgetByLine.by;
				$scope.date = day.day;
				console.log(widgetName);
				console.log(widgetByLine);
				console.log(day);
				// load style sheet
			}
		}
	}]);

angular.module('youtubeWidget.services', []).
	service('includeStyle', function(){
		// Append a style sheet to the head if it has not already
	});


angular.module('youtubeWidget.factories', []).
	factory('widgetName', function(){
		return {
			name: 'YouTube Widget'
		}
	});

angular.module('youtubeWidget').
	factory('widgetVersion', function(){
		return {
			version: '0.123'
		}
	});

angular.module('youtubeWidget.config', ['youtubeWidget.providers']).
	config(function($provide){
		$provide.factory('widgetByLine', function(){
			return {
				by: 'Blake'
			}
		});
	}).config(function(dayProvider){
		dayProvider.setDay('Mon');
	});

angular.module('youtubeWidget.providers', []).
	provider('day', function(){
		var day = '';
		return {
			setDay: function(current){
				day = current;
			},
			$get: function(){
				return {
					day: day + 'day'
				}
			}
		}
	});