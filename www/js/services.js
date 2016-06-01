angular.module('greyback.services', [])

.service('NewsService', function ($q, $http, $location, $ionicSlideBoxDelegate, $localStorage, $state, $data) {
	console.warn('NewsService');
	var self = this;
	var config = {
		latest: {
			name: 'NewsArticle.latest',
			url: '/ajax/plugin/news/news_articles/json/limit:4/category:3',
			variable: 'banners'
		}
	};

	self.banners = [];
	
	

	self.populate = function () {
		console.log('NewsService.populate');
		return $data.populate(config.latest, self);
	}
	
	self.latest = function () {
		console.log('NewsService.latest');
		return $data.get(config.latest, self);
	}
})

.service('CommunityService', function ($q, $data, $state, $location) {
	console.warn('CommunityService');
	var self = this;
	var config = {
		latest: {
			name: 'CommunityPost.latest',
			url: '/ajax/plugin/community/community_posts/json',
			variable: 'posts'
		}
	};
	
	self.posts = [];
	
	self.populate = function () {
		console.log('CommunityService.populate');
		var results = $data.populate(config.latest, self);
		return results;
	}
	
	self.latest = function () {
		console.log('CommunityService.latest');
		console.warn( $data.get(config.latest, self));
		return $data.get(config.latest);
	}
	
	self.get = function(postIndex) {
		console.log(['CommunityService.get',postIndex]);
		if(self.posts.length) {
			return self.posts[postIndex];	
		} else {
			$location.path('#/menu/tabs/home');
			$location.replace();
			return null;
		}
	}
})

.service('PtrService', function ($timeout, $ionicScrollDelegate) {
	console.warn('PtrService');
	/**
	 * Trigger the pull-to-refresh on a specific scroll view delegate handle.
	 * @param {string} delegateHandle - The `delegate-handle` assigned to the `ion-content` in the view.
	 */
	this.triggerPtr = function (delegateHandle) {

		$timeout(function () {

			var scrollView = $ionicScrollDelegate.$getByHandle(delegateHandle).getScrollView();

			if (!scrollView) return;

			scrollView.__publish(
				scrollView.__scrollLeft, -scrollView.__refreshHeight,
				scrollView.__zoomLevel, true);

			var d = new Date();

			scrollView.refreshStartTime = d.getTime();

			scrollView.__refreshActive = true;
			scrollView.__refreshHidden = false;
			if (scrollView.__refreshShow) {
				scrollView.__refreshShow();
			}
			if (scrollView.__refreshActivate) {
				scrollView.__refreshActivate();
			}
			if (scrollView.__refreshStart) {
				scrollView.__refreshStart();
			}

		});

	}
});
