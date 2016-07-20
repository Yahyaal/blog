angular.module('blogList').controller('BlogListCtrl', function($scope,$http,$uibModal) {
	function getThreads() {
		$http.get('/threads').then(function(response) {
			$scope.threads = response.data;
		});
	}
	getThreads();

	$scope.addComment = function(thread) {                 // addComment() will open a modal with CommentCtrl, pass 'thread', and then call getThreads() after it closes
		var modalInstance = $uibModal.open({
			templateUrl: 'comment.html',
			controller: 'CommentCtrl',
			resolve: {
				threadItem: function() {return thread;}   // Inject our 'thread' variable as 'threadItem'
			}
		});
		modalInstance.result.then(function() {          // This executes after $uibModalInstance.close() is called from ThreadCtrl
			getThreads();
		});
	};

	$scope.loadThread = function(thread) {
		if(!thread) thread={date: new Date()};
		var modalInstance = $uibModal.open({
			templateUrl: 'thread.html',
			controller: 'ThreadCtrl',
			resolve: {
				threadItem: function() {return thread;}
			}
		});
		modalInstance.result.then(function() {
			getThreads();
		});
	};
});
