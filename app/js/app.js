'use strict';

angular.module('youtubeWidget',['youtubeWidget.directives']);

angular.module('youtubeWidget.controllers', []).
	controller('mainCtrl', ['$scope', function($scope){
		$scope.test = 'this is a test';

	}]);

angular.module('youtubeWidget.directives', []).
	directive('youtubeWidgetApp', [function(){
		return {
			restrict: 'C',
			template: '<p>This is a directive test: {{test}}</p>',
			controller: function($scope, $element, $attrs, $transclude) {
				$scope.test = 'Test Complete';
			}
		}
	}]);

//angular.module('youtubeWidget.services', []).factory(
//
//);
