angular.module('linkspot')

.factory('Email', ['$firebaseArray', '$http', function($firebaseArray, $http) {
    var dataRef = new Firebase("https://linkspot.firebaseIO.com/test_keys/");
    var keys = $firebaseArray(dataRef);
    var url = "https://{user}api.mailgun.net/v3/sandbox9508412c6a9142efb3240ab88b6b23d1.mailgun.org/messages";
    var user = "api:{key}@";
    // Example POST Request
    //https://api:key-e32cb09c1ec964ea3a17cab1e20b344b@api.mailgun.net/v3/sandbox9508412c6a9142efb3240ab88b6b23d1.mailgun.org/messages?to=angelgirl2272@gmail.com&subject=Hello&text=testtest&from=angelal4@uci.edu

    var get_key = function() {
    	var email_key = "";
		dataRef.once("value", function(snapshot) {
	        snapshot.forEach(function(childSnapshot) {
	            var key = childSnapshot.key();
	            var value = childSnapshot.val();
	            if (key == "mailgun")
	            	email_key = value;
	        });
	    });
		return email_key;
    };

    var get_url = function() {
		var http_url = url.replace("{user}", user)
		http_url = http_url.replace("{key}", get_key());
		return http_url;
    };

	return {
		send: function(to, from, subject, msg) {
			console.log(to);
			console.log(from);
			console.log(subject);
			console.log(msg);

			var url = get_url();
			console.log(url);

			var data = {
	            from: from,
	            to: to,
	            subject: subject,
	            text: msg
	        };

	        var req = {
                method: 'POST',
                url: url,
                data: JSON.stringify(data),
                headers: {
                    'user-Token': get_key(),
                    'content-Type': 'Application/Json'
                }
            }

	        // var config = {
	        // 	withCredentials: true
	        // };

	        // url = url + "?to=angelgirl2272@gmail.com&subject=Hello&text=testtest&from=angelal4@uci.edu";

	        // TODO: Currently can't figure out how to pass in the authentication key as a user.
	        return $http(req);
		}
	};

}]);
