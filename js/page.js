var helpgrandma = helpgrandma || {},
    chrome = chrome || {},
    mail = mail || {};

function Page() {
    this.isInit = false;

    /**
     * Opens the sidebar with the options for the grandma
     */
    this.openSideBar = function() {
        // init only once
        if (this.isInit) {
            return;
        }

        var frame = chrome.extension.getURL("frame.html");

        $.get(frame, function(response) {
            // position absolute fix
            $("body > div:not(.grandma-frame-wrapper)").filter(function(){
                return (['absolute', 'fixed'].indexOf($(this).css('position')) !== -1);
            }).addClass('grandma-pos-abs-fix');
            // width 100% fix
            // $("body > div:not(.grandma-frame-wrapper):not(.grandma-pos-abs-fix)").filter(function(){
            //     return ($(this)[0].style.width === '' && $(this).parent().width() === $(this).width());
            // }).addClass('grandma-width100-fix');
            // add frame
            $("body").prepend(response);
        });

        this.isInit = true;
    };

    this.navigate = function(url){
        chrome.tabs.update({
            url: url
        });
    };

    this.launch = function(type) {
        switch(type) {
            case 'search' :
                mail.Composer.initComposer();
        }
        // do something here to launch help
    };
}

helpgrandma.Page  = new Page();