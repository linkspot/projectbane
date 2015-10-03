angular.module('linkspot')

.factory('Camera', [function() {
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
