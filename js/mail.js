var mail = mail || {};

function Composer() {
	this.init = false;

	this.initComposer = function () {
		if(!this.init) {
    		$('.z0').append('<div class=""></div>')
    		$('.z0').children().addClass("composer-button");
    		this.init = true;
    	}
	};
};

mail.Composer  = new Composer();