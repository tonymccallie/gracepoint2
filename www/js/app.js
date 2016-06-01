var DOMAIN = 'http://www.gracepointcoppell.org'
	//DEVELOPMENT
var devtest = /localhost/.test(window.location.hostname);
if (devtest) {
	DOMAIN = 'http://localhost/greyback_shiny';
	isMobile = false;
}
devtest = /threeleaf/.test(window.location.hostname);
if (devtest) {
	DOMAIN = 'http://office.threeleaf.net:8080/greyback_shiny';
	isMobile = false;
}

angular.module('greyback', ['ionic', 'greyback.controllers', 'greyback.services', 'greyback.utils', 'ImgCache'])

.run(function ($ionicPlatform, ImgCache) {
	$ionicPlatform.ready(function () {
		console.log('$ionicPlatform.ready');
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
		ImgCache.$init();
	});
})

.config(function ($stateProvider, $urlRouterProvider, ImgCacheProvider) {
	ImgCacheProvider.setOptions({
		debug: true,
		usePersistentCache: true,
		manualInit: true
	});

	// ImgCache library is initialized automatically,
	// but set this option if you are using platform like Ionic -
	// in this case we need init imgcache.js manually after device is ready

	$stateProvider
		.state('menu', {
			url: '/menu',
			abstract: true,
			templateUrl: 'templates/system/menu.html',
			controller: 'AppController'
		})

	.state('menu.tabs', {
		url: '/tabs',
		abstract: true,
		views: {
			'menuContent': {
				templateUrl: "templates/system/tabs.html",
			}
		}
	})

	.state('menu.tabs.home', {
		url: '/home',
		views: {
			'tab-home': {
				templateUrl: "templates/home.html",
				controller: 'HomeController'
			}
		},
		resolve: {
			banners: function (NewsService) {
				console.log('State.menu.tabs.home.resolve[banners]');
				return NewsService.populate();
			},
			posts: function (CommunityService) {
				console.log('State.menu.tabs.home.resolve[posts]');
				return CommunityService.populate();
			}
		}
	})
	
	.state('menu.tabs.post', {
		url: '/post/:postIndex',
		views: {
			'tab-home': {
				templateUrl: 'templates/home/post.html',
				controller: 'PostController'
			}
		},
		resolve: {
			post: function(CommunityService, $stateParams) {
				console.log('State.menu.tabs.home.post.resolve[post]');
				return CommunityService.post($stateParams.postIndex);
			}
		}
	}) 
	
	.state('menu.tabs.article',{
		url: '/article/:articleIndex',
		views: {
			'tab-home': {
				templateUrl: 'templates/home/article.html',
				controller: 'ArticleController'
			}
		},
		resolve: {
			article: function(NewsService, $stateParams) {
				return NewsService.article($stateParams.articleIndex)
			}
		}
	})

	.state('menu.tabs.sermons', {
		url: '/sermons',
		views: {
			'tab-sermons': {
				templateUrl: "templates/sermons/sermons_home.html",
			}
		}
	})

	.state('menu.tabs.groups', {
		url: '/groups',
		views: {
			'tab-groups': {
				templateUrl: "templates/groups/groups_home.html",
			}
		}
	})

	.state('menu.tabs.events', {
		url: '/events',
		views: {
			'tab-events': {
				templateUrl: "templates/events/events_home.html",
			}
		}
	})

	.state('menu.tabs.live', {
		url: '/live',
		views: {
			'tab-live': {
				templateUrl: "templates/live/live_home.html",
			}
		}
	})

	.state('menu.tabs.about', {
		url: '/about',
		views: {
			'tab-static': {
				templateUrl: "templates/static/about.html",
			}
		}
	})

	.state('menu.tabs.contact', {
		url: '/contact',
		views: {
			'tab-static': {
				templateUrl: "templates/static/contact.html",
			}
		}
	})

	.state('menu.tabs.new', {
		url: '/new',
		views: {
			'tab-static': {
				templateUrl: "templates/static/new.html",
			}
		}
	})

	.state('menu.tabs.giving', {
		url: '/giving',
		views: {
			'tab-static': {
				templateUrl: "templates/static/giving.html",
			}
		}
	})

	.state('menu.tabs.developer', {
		url: '/developer',
		views: {
			'tab-static': {
				templateUrl: "templates/static/developer.html",
			}
		}
	})

	.state('menu.tabs.jesus', {
		url: '/jesus',
		views: {
			'tab-static': {
				templateUrl: "templates/static/jesus.html",
			}
		}
	})

	.state('menu.tabs.settings', {
		url: '/settings',
		views: {
			'tab-static': {
				templateUrl: "templates/static/settings.html",
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/menu/tabs/home');
});
