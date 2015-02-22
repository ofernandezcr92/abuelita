var helpgrandma = helpgrandma || {};

(function(){
    function Composer() {
        this.init = false;

        this.initComposer = function () {
            if(!this.init) {
                if($('.z0').length > 0) {

                //     setTimeout(1000, function() {
                //         $('body').prepend('<div class="high-light"></div>');
                //         $('.z0').parent().addClass("relevant-area");
                //         $('.z0').parent().append('<div class="composer-announcement"><div class="left-arrow"></div><div class="grandma-container"></div><span class="grandma-text"> Click this button </span></div>');
                //         $('.z0').children().addClass("composer-button");
                //     });
                    $('body').prepend('<div class="high-light"></div>');
                    $('.z0').parent().addClass("relevant-area");
                    $('.z0').parent().append('<div class="composer-announcement"><div class="left-arrow"></div><div class="grandma-container"></div><span class="grandma-text"> Click this button </span></div>');
                    $('.z0').children().addClass("composer-button");

                    $('.z0').eq(0).bind("click", function() {
                        $('.high-light').remove();
                        $('.composer-announcement').remove();
                        $('.z0').parent().removeClass("relevant-area");
                        $('.z0').eq(0).removeClass("composer-button");
                    });

                    this.init = true;
                }
            }
        };
    }

    helpgrandma.Composer  = new Composer();
})();





