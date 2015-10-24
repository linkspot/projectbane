angular.module('linkspot')

.filter('capitalize', function() {
	return function(input, all) {
		return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
	}
})

.filter('selectTags', function () {
    return function (contacts, selectedTags) {
    	var items = {
            selectedTags: selectedTags,
            out: []
        };

    	if (selectedTags.length > 0) {
	        angular.forEach(contacts, function (contact, index) {
	        	// Check if at least one of the selected tags is in the contact's tags array.
	        	var intersection = _.intersection(this.selectedTags, contact.tags);

	        	if (intersection.length > 0)
	                this.out.push(contact);
	        }, items);
    	}
    	else {
    		items.out = contacts;
    	}

        return items.out;
    };
});