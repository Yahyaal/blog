angular.module('blogList').controller('CommentCtrl', function($scope,$uibModal,$uibModalInstance,$http, threadItem) {     // Inject our dependencies and threadItem (the item we are editing)
	console.log('CommentCtrl threadItem=', threadItem);
	$scope.comment={date: new Date()};
	$scope.save = function() {
		threadItem.comments.push($scope.comment);                                  // Push the current comment onto the comments array in threadItem
		$http.post('/threads', threadItem).then(function(response) {          		// Post threadItem to our /threads POST route and then...
			console.log('post /threads: ', response.data);
			$uibModalInstance.close();
		});
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss();
	};
});
