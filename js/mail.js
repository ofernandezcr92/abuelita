var mail = mail || {};

function Composer() {
	this.init = false;

	this.initComposer = function () {
		if(!this.init) {
			if($('.z0').length > 0) {
				$('body').prepend('<div class="high-light"></div>');
				$('.z0').parent().addClass("relevant-area");
    			$('.z0').parent().append('<div class="composer-announcement"><span> Hola Kennt </span></div>')
    			$('.z0').children().addClass("composer-button");
    			this.init = true;
    		}
    	}
	};
};

mail.Composer  = new Composer();