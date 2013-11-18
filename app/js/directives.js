'use strict';

angular.module('youtubeWidget.directives', []).
	directive('youtubeWidgetApp', [function(){
		return {
			restrict: 'C',
			templateUrl: 'youtubeWidgetApp.html',
			controller: 'test'
		}
	}]).
	run(function($templateCache){
		$templateCache.put('youtubeWidgetApp.html', '' +
			'<div class="mod-youtubeWidget">' +
				'This is the main youtubeWidget Mod Container ' +
				'<div class="player">' +
					'' +
				'</div>' +
				'<ul>' +
			'       <li data-ng-repeat="video in videos">' +
			'           {{video.snippet.title}}' +
			'           <img src="{{video.snippet.thumbnails.default.url}}"/>' +
			'       </li>' +
				'</ul>' +
			'</div>' +
			'');
	});
