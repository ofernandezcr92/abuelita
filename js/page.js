var helpgrandma = helpgrandma || {},
    chrome = chrome || {},
    mail = mail || {},
    search = search || {};

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

        var self = this,
            frame = chrome.extension.getURL("frame.html");

        $.get(frame, function(response) {
            // wrap site content
            $("body").wrapInner('<div id="grandma-site" class="grandma-frame-wrapper"></div>');
            // add frame
            $("body").prepend(response);

            self.initButtons();
        });

        this.isInit = true;
    };

    this.navigate = function(url){
        chrome.runtime.sendMessage({
            action: "navigate",
            url: url
        });
    };

    this.launch = function(type) {
        switch(type) {
            case 'search' :
                mail.Composer.initComposer();
                search.Bar.initBar();
        }
        // do something here to launch help
    };

    this.initButtons = function(){
        var HELP_GRANMA_URLS = {
            MAIL: 'https://mail.google.com',
            SEARCH : 'https://www.google.com',
        };

        var self = this;

        function init () {
            self.findElems()
                .bind();
        }

        this.findElems = function() {
            this.$container = $('#grandma-frame');
            this.$btnCall = this.$container.find(".btn-call");
            this.$btnSearch = this.$container.find(".btn-search");
            this.$btnMail = this.$container.find(".btn-mail");

            return this;
        };

        this.bind = function() {
            this.$btnMail.on('click', function() {
                helpgrandma.Page.navigate(HELP_GRANMA_URLS.MAIL);
            });
            this.$btnSearch.on('click', function(){
                helpgrandma.Page.navigate(HELP_GRANMA_URLS.SEARCH);
            });

            return this;
        };

        // this.navigate = function(page) {
        //     // alert(12312);
        //     helpgrandma.Page.navigate(page);
        // };

        init();
    };
}

helpgrandma.Page  = new Page();