angular.module('linkspot')

.factory('Email', ['$firebaseArray', '$http', 'Base64', function($firebaseArray, $http, Base64) {
    var dataRef = new Firebase("https://linkspot.firebaseIO.com/test_keys/");
    var keys = $firebaseArray(dataRef);
    var url = "https://api.mailgun.net/v3/sandbox9508412c6a9142efb3240ab88b6b23d1.mailgun.org/messages";

    var getAuthInfo = function() {
    	var email_user = ""
    	var email_key = "";
		dataRef.once("value", function(snapshot) {
	        snapshot.forEach(function(childSnapshot) {
	            var key = childSnapshot.key();
	            var value = childSnapshot.val();
	            if (key == "mailgun") {
	            	email_user = value["user"];
	            	email_key = value["key"];
	            }
	        });
	    });
		return email_user + ":" + email_key;
    };

	return {
		createEmail: function(contact, msg) {
			var html = "<html><body>";

			html += "<h1>" + contact.name + "</h1>";
			html += "<h1>" + contact.title + " at " + contact.company + "</h1>";
			html += "<h2> Email: " + contact.email + "</h2>";
			html += "<h2> Phone: " + contact.phone + "</h2>";
			html += "<img src=" + contact.card + "></img>";

			return html + "</body></html>";
		},
		send: function(to, from, subject, msg) {
			var data = {
	            'to': to,
	            'from': from,
	            'subject': subject,
	            'html': msg
	        };

	        var req = {
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
                data: data
            };

	        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(getAuthInfo());
	        return $http(req);
		}
	};

}]);
