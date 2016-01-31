angular.module('linkspot')

.factory('Camera', ['$cordovaCamera', '$ionicActionSheet', '$jrCrop', '$q', function($cordovaCamera, $ionicActionSheet, $jrCrop, $q) {
	return {
		// Configuring options
		showActionSheet: function(setPictureFunction) {
			// Show the action sheet
			var hideSheet = $ionicActionSheet.show({
				buttons: [
					{ text: '<i class="icon ion-camera"></i>Take Picture' },
					{ text: '<i class="icon ion-images"></i>Upload From Gallery' }
				],
				titleText: '<font color="black">Choose Picture Source</font>',
				cancelText: 'Cancel',
				cancel: function() {
				// add cancel code..
				},
				buttonClicked: function(index) {
					// console.log('CAMERA ACTIONSHEET BUTTON CLICKED', index);
					if (index === 0) {
						options = {
							quality: 80,
							destinationType: Camera.DestinationType.DATA_URL,
							sourceType: Camera.PictureSourceType.CAMERA,
							allowEdit: false,
							encodingType: Camera.EncodingType.JPEG,
							targetWidth: 350,
							targetHeight: 200,
							popoverOptions: CameraPopoverOptions,
							saveToPhotoAlbum: false,
							correctOrientation: true
						};
						setPictureFunction.call(this, options);
					} else if (index === 1) {
							options = {
							quality : 80, 
							destinationType : Camera.DestinationType.DATA_URL, 
							sourceType : 0, 
							allowEdit: false,
							encodingType: Camera.EncodingType.JPEG,
							targetWidth: 350,
							targetHeight: 200,
							correctOrientation : true
						};
						setPictureFunction.call(this, options);
					}                                                                           
					return true;
				}
			});
		},
    	cropImage: function(url) {
    		var deferred = $q.defer();
			$jrCrop.crop({
				url: url,
				width: 350,
				height: 200
			})
			.then(function(canvas) {
				// success!
				var image = canvas.toDataURL();
				console.log(image);
				deferred.resolve(image);
			}, function() {
				// User cancelled or couldn't load image.
				deferred.reject("No image");
			});
			return deferred.promise;
		}
	}
}]);