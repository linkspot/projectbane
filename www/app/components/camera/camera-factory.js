angular.module('linkspot')

.factory('Camera', [function() {
	var image = "";

	console.log("CAMERA FACTORY")

	return {
		setProfile: function(imageData) {
		  image = imageData;
		},
		getProfile: function() {
		  return image;
		}
	};


}]);
