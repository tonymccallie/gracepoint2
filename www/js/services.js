angular.module('greyback.services', [])

.service('NewsService', function ($q, $http, $location, $ionicSlideBoxDelegate, $localStorage, $state, $data) {
	console.warn('NewsService');
	var self = this;
	var config = {
		latest: {
			name: 'NewsArticle.latest',
			url: '/ajax/plugin/news/news_articles/json/limit:4/category:3'
		}
	};

	self.banners = [];
	
	

	self.populate = function () {
		console.log('NewsService.populate');
		return $data.populate(config.latest);
	}
	
	self.latest = function () {
		console.log('NewsService.latest');
		return $data.get(config.latest);
	}
})

.service('CommunityService', function ($data) {
	console.warn('CommunityService');
	var self = this;
	var config = {
		latest: {
			name: 'CommunityPost.latest',
			url: '/ajax/plugin/community/community_posts/json'
		}
	};
	
	self.posts = [];
	
	self.populate = function () {
		console.log('CommunityService.populate');
		return $data.populate(config.latest);
	}
	
	self.latest = function () {
		console.log('CommunityService.latest');
		return $data.get(config.latest);
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
