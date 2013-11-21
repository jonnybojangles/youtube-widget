"use strict";!function(a){function b(a,b,c){return a[b]||(a[b]=c())}return b(b(a,"angular",Object),"module",function(){var a={};return function(c,d,e){return d&&a.hasOwnProperty(c)&&(a[c]=null),b(a,c,function(){function a(a,c,d){return function(){return b[d||"push"]([a,c,arguments]),h}}if(!d)throw Error("No module: "+c);var b=[],f=[],g=a("$injector","invoke"),h={_invokeQueue:b,_runBlocks:f,requires:d,name:c,provider:a("$provide","provider"),factory:a("$provide","factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:g,run:function(a){return f.push(a),this}};return e&&g(e),h})}})}(window),!function(a,b,c){function d(a,c){var d=b.createElement("script"),e=k;d.onload=d.onerror=d[p]=function(){d[n]&&!/^c|loade/.test(d[n])||e||(d.onload=d[p]=null,e=1,c())},d.async=1,d.src=a,f.insertBefore(d,f.firstChild)}function e(a,b){q(a,function(a){return!b(a)})}var f=b.getElementsByTagName("head")[0],g={},h={},i={},j={},k=!1,l="push",m="DOMContentLoaded",n="readyState",o="addEventListener",p="onreadystatechange",q=function(a,b){for(var c=0,d=a.length;d>c;++c)if(!b(a[c]))return k;return 1};!b[n]&&b[o]&&(b[o](m,function t(){b.removeEventListener(m,t,k),b[n]="complete"},k),b[n]="loading");var r=function(a,b,f){function k(){if(!--s){g[p]=1,o&&o();for(var a in i)q(a.split("|"),m)&&!e(i[a],m)&&(i[a]=[])}}function m(a){return a.call?a():g[a]}a=a[l]?a:[a];var n=b&&b.call,o=n?b:f,p=n?a.join(""):b,s=a.length;return c(function(){e(a,function(a){j[a]?(p&&(h[p]=1),k()):(j[a]=1,p&&(h[p]=1),d(r.path?r.path+a+".js":a,k))})},0),r};r.get=d,r.ready=function(a,b,c){a=a[l]?a:[a];var d=[];return!e(a,function(a){g[a]||d[l](a)})&&q(a,function(a){return g[a]})?b():!function(a){i[a]=i[a]||[],i[a][l](b),c&&c(d)}(a.join("|")),r};var s=a.$script;r.noConflict=function(){return a.$script=s,this},"undefined"!=typeof module&&module.exports?module.exports=r:a.$script=r}(this,document,setTimeout),function(a){var b=["","./css/youtube-widget.css","http://fonts.googleapis.com/css?family=Roboto:400,100"],c=function(b){var c=a.getElementsByTagName("head")[0],d=a.createElement("link");d.rel="stylesheet",d.type="text/css",d.href=b,d.media="all",c.appendChild(d)};b.forEach(c)}(document),function(a){var b=a.querySelector(".youtube-widget-app"),c=function(a){$script(["lib/angular/angular.js","lib/angular-local-storage/angular-local-storage.js","js/app.js","js/controllers.js","js/directives.js","js/services.js"],function(){angular.bootstrap(a,["youtubeWidget"])})};if(b)c(b);else{var d=a.createDocumentFragment(),e=a.createElement("div"),f=a.getElementsByTagName("body")[0];e.setAttribute("id","dynamicYoutubeWidget"),e.setAttribute("class","youtube-widget-app"),d.appendChild(e),f.appendChild(d),c(a.getElementById("dynamicYoutubeWidget"))}}(document),angular.module("youtubeWidget",["youtubeWidget.services","youtubeWidget.directives","youtubeWidget.controllers"]),angular.module("youtubeWidget.services",["LocalStorageModule"]).provider("videoSearch",[function(){this.api={baseURI:"https://www.googleapis.com/youtube/v3/search",key:"AIzaSyAd5GLH7ep_QXp6o5MP6AUVo1wN3hZrOT4"},this.cachePrefix="vs",this.defaultQueryString="Oculus",this.maxResults=10,this.$get=["$q","localStorageService","$http",function(a,b,c){var d=this.api,e=this.maxResults,f=this.cachePrefix,g=this.defaultQueryString,h=function(a,b){return a=a||"",b=b||"",f+"-"+a+"-"+b};return{search:function(f,i){f=f||g;var j=h(f,i),k=b.get(j);if(null===k){var l={part:"snippet",type:"video",key:d.key,maxResults:e,q:f,callback:"JSON_CALLBACK"};return i&&(l.pageToken=i),c.jsonp(d.baseURI,{params:l}).then(function(a){return b.add(j,a),a})}return a.when(k)},mergeVideoLists:function(a,b){return a.concat(b)}}}]}]).factory("videoPlayer",["$q","$window",function(a,b){var c,d,e,f=!1,g=function(){e.resolve(c)},h=function(){d.resolve()},i=function(){},j=function(d,f){return e=a.defer(),c=new b.YT.Player(d,{videoId:f,events:{onReady:g}}),e.promise},k=function(){$script("https://www.youtube.com/iframe_api",function(){f=!0})};return{callOnPlayerReady:g,callOnPlayerStateChange:i,createPlayer:j,playNewVideo:function(a,b,c,d){a&&(a.cueVideoById(b,c,d),a.playVideo())},init:function(){return d=a.defer(),k(),b.onYouTubeIframeAPIReady=h,d.promise}}}]),angular.module("youtubeWidget.directives",[]).directive("youtubeWidgetApp",[function(){return{restrict:"C",templateUrl:"youtubeWidgetApp.html",controller:"youtubeWidgetApp"}}]).run(function(a){a.put("youtubeWidgetApp.html",'<div class="mod-youtubeWidget" data-ng-class="{playerActive: isPlayerActive, listActive: isListActive, error: isError}"><!--[if IE]><div class="ie"><![endif]--><div class="mod-wrapper"><div class="row-wrapper"><div class="mainCol"><div class="content"><a name="videoPlayerTop"></a><p class="fade appTitle" data-ng-class="{fadeIn: videos}">{{query}} YouTube Videos</p><div class="videoPlayerWrapper"><div class="mod-spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div><div data-video-player data-video-meta="videoMeta"data-player="player"data-is-player-active="isPlayerActive"></div></div><h2 class="videoTitle">{{videoMeta.title}}</h2><p class="videoDescription">{{videoMeta.description}}</p></div></div><div class="listWrapper"><div class="sidebar"><div class="sidebar-content"><div data-video-list data-videos="videos" data-player="player"data-query="query"data-is-error="isError"data-is-list-active="isListActive"data-video-meta="videoMeta"></div></div></div></div></div></div><!--[if IE]></div><![endif]--></div>')}),angular.module("youtubeWidget.directives").directive("videoList",[function(){return{restrict:"A",templateUrl:"videoList.html",controller:"videoList",scope:{videos:"=",player:"=",isError:"=",query:"=",isListActive:"=",videoMeta:"="}}}]).run(function(a){a.put("videoList.html",'<div class="videoList"><ul class="items"><li class="item"data-ng-repeat="video in videos" data-ng-click="listItemClicked(video)"><div class="row"><div class="cell"><img data-ng-src="{{video.snippet.thumbnails.default.url}}" /> </div><div class="cell">{{video.snippet.title}}</div></div></li><li class="loadMore item fade" data-ng-class="{fadeIn: videos}" data-ng-click="loadMore()"><div class="row"><div class="cell">See More</div></div></li></ul></div>')}),angular.module("youtubeWidget.directives").directive("videoPlayer",[function(){return{restrict:"A",template:"<div></div>",controller:"videoPlayer",scope:{videoMeta:"=",player:"=",isPlayerActive:"="}}}]),angular.module("youtubeWidget.controllers",[]).controller("youtubeWidgetApp",["$scope",function(a){a.videos=[],a.query="Oculus",a.player=null,a.videoMeta={videoId:"",title:"",description:"",nextPageToken:"",prevPageToken:""},a.isError=!1,a.isPlayerActive=!1,a.isListActive=!1}]).controller("videoList",["$scope","$element","videoPlayer","videoSearch","$anchorScroll",function(a,b,c,d,e){function f(a,b){var c;c=d.search(a,b),c.then(function(a){g(a)})}function g(c){0<c.hasOwnProperty("data")&&"youtube#searchListResponse"===c.data.kind&&0<c.data.items.length?(a.videos=d.mergeVideoLists(a.videos,c.data.items),a.videoMeta.videoId=a.videoMeta.videoId||a.videos[0].id.videoId,a.videoMeta.title=a.videos[0].snippet.title,a.videoMeta.description=a.videos[0].snippet.description,a.videoMeta.nextPageToken=c.data.nextPageToken,a.videoMeta.nextPageToken=c.data.nextPageToken,c.data.nextPageToken||angular.element(b[0].querySelector(".loadMore")).remove(),a.isListActive=!0):(a.isError=!0,console.log("Error: youtube-widget: videoList: failed to get video results."))}function h(){f(a.query,a.videoMeta.nextPageToken)}function i(b){c.playNewVideo(a.player,b.id.videoId),a.videoMeta.videoId=b.id.videoId,a.videoMeta.title=b.snippet.title,a.videoMeta.description=b.snippet.description,e("videoPlayerTop")}a.loadMore=h,a.listItemClicked=i,f(a.query)}]).controller("videoPlayer",["$scope","$window","$element","videoPlayer",function(a,b,c,d){var e,f;e=d.init(),e.then(function(){a.$watch("videoMeta.videoId",function(){a.videoMeta.videoId&&(f=d.createPlayer(c[0],a.videoMeta.videoId),f.then(function(b){a.player=b,a.isPlayerActive=!0}))})})}]);