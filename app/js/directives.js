'use strict';

angular.module('youtubeWidget.directives', []).
	directive('youtubeWidgetApp', function(){
		return {
			restrict: 'C',
			templateUrl: 'youtubeWidgetApp.html'
		}
	}).
	run(function($templateCache){
		$templateCache.put('youtubeWidgetApp.html', '' +
			'<div class="mod-youtubeWidget">' +
				'This is the main youtubeWidget Mod Container ' +
			'</div>' +
			'');
	});
