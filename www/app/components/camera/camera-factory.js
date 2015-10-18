angular.module('linkspot')

.factory('Camera', ['$cordovaCamera', '$ionicActionSheet', function($cordovaCamera, $ionicActionSheet) {
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
							quality: 50,
							destinationType: Camera.DestinationType.DATA_URL,
							sourceType: Camera.PictureSourceType.CAMERA,
							allowEdit: true,
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
							quality : 50, 
							destinationType : Camera.DestinationType.DATA_URL, 
							sourceType : 0, 
							allowEdit: true,
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
		}
	};


}]);