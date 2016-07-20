angular.module('blogList').controller('ThreadCtrl', function($scope,$uibModal,$uibModalInstance,$http, threadItem) {
	console.log('ThreadCtrl threadItem=', threadItem);
	$scope.thread = threadItem;
	if(threadItem.date) threadItem.date = new Date(threadItem.date);

	$http.get('/authors').then(function(res) {          // GET /authors
		$scope.authors = res.data;						// Assign list to $scope.authors
	});

	$scope.save = function() {
		$http.post('/threads', $scope.thread).then(function(response) {
			console.log('post /threads: ', response.data);
			$uibModalInstance.close();
		});
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss();
	};

	$scope.delete = function() {
		var deleteModalInstance = $uibModal.open({
			templateUrl: 'confirm.html',
			controller: function($scope,$uibModalInstance) {
				$scope.yes = function() {
					$uibModalInstance.close();
				};
				$scope.no = function() {
					$uibModalInstance.dismiss();
				};
			}
		});
		deleteModalInstance.result.then(function() {
			$http.delete('/threads/' + $scope.thread._id).then(function() {
				$uibModalInstance.close();
			});
		});
	};
});
