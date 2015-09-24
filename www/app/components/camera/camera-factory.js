angular.module('linkspot')

.factory('CameraService', [function() {
	var image = "";

	return {
		setProfile: function(imageData) {
		  image = imageData;
		},
		getProfile: function() {
		  return image;
		}
	};
}]);
