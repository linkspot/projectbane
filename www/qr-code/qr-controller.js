angular.module('linkSpot')

    .controller('qrController', function($scope, $http) {
        var fetchBlob = function(uri, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', uri, true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function(e) {
                if(this.status == 200) {
                    var blob = this.response;
                    if(callback) {
                        callback(blob);
                    }
                }
            };
            xhr.send();
        };

        $scope.getData = function() {

            var url = 'http://api.qrcode.unitag.fr/api?t_pwd=degraded&T=PNG&setting={"LAYOUT":{"COLORBG":"ffffff","GRADIENT_TYPE":"DIAG1","COLOR1":"872BE3", "COLOR2":"DCC7F2"},"EYES":{"EYE_TYPE":"ECurve_ICurve"},"BODY_TYPE":1,"ARRONDI":7}&data={"DATA":{"TEXT":"3"},"TYPE":"text"}';
            fetchBlob(url, function(blob) {
                str = String.fromCharCode.apply(null, new Uint8Array(blob));
                document.getElementById("qr-image").src = 'data:image/png;base64,' + btoa(str);
            });
        }

    });