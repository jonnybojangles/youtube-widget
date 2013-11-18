'use strict';

angular.module('youtubeWidget.controllers', []).
	controller('test', ['$scope', 'videoSearch', '$http', function($scope, vs, $http){
		var videoList;
		$scope.videos = {};
		$scope.nextPage = '';
		videoList = vs.search('test');
		videoList.then(function(data){
			if (0 < data.data.items.length) {
				console.log(data.data);
				$scope.videos = data.data.items;
				$scope.nextPage = data.data.nextPageToken;
				console.log($scope.videos);
			}

//			videoList = vs.search('test', $scope.nextPage);
//			videoList.then(function(data){
//				$scope.videos = data.data.items;
//			});
		});



		console.log('Test Controller: Last thing inside the controller.');
	}]);
