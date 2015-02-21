var mail = mail || {};

function Composer() {
	this.init = false;

	this.initComposer = function () {
		if(!this.init) {
			if($('.z0').length > 0) {
    			$('.z0').append('<div class=""></div>')
    			$('.z0').children().addClass("composer-button");
    			this.init = true;
    		}
    	}
	};
};

mail.Composer  = new Composer();