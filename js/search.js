var search = search || {};

function Bar() {
	this.init = false;

	this.initBar = function () {
		if(!this.init) {
			if($('#sfdiv').length > 0) {
    			$('#sfdiv').addClass("search-bar");
    			this.init = true;
    		}
    	}
	};
}

search.Bar  = new Bar();