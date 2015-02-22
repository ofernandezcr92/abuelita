var helpgrandma = helpgrandma || {},
    chrome = chrome || {},
    console = console || {},
    search = search || {};

var TEMPLATES = {};

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
            frameURL = chrome.extension.getURL("templates/frame.html"),
            buttonURL = chrome.extension.getURL("templates/button.html");

        $.get(frameURL, function(response) {
            TEMPLATES['frame'] = response;

            // wrap site content
            // TODO: this doesn't work in gmail/google
            // $("body").wrapInner('<div id="grandma-site" class="grandma-frame-wrapper"></div>');

            // add frame
            var html = $(response);
                html.find('.header img').attr('src', chrome.extension.getURL("img/abuela.png"));

            $("body").prepend(html);

            $.get(buttonURL, function(response) {
                TEMPLATES['button'] = response;
                self.initButtons();
            });
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
        // tutorials + steps
        // switch(type) {
        //     case 'mail' :
        //         helpgrandma.Composer.initComposer();
        //         break;
        //     case 'search' :
        //         search.Bar.initBar();
        //         break;
        // }
        // do something here to launch help
    };

    this.initButtons = function(){
        var self = this,
            ACTIONS_DATA = {};

        function init(){
            chrome.runtime.sendMessage({
                action: "getData"
            }, function(data) {
                ACTIONS_DATA = data;
                self.setup();
            });
        }

        this.setup = function() {
            this.$container = $('#grandma-frame .available-actions');

            for (var i in ACTIONS_DATA) {
                var actionConfig = ACTIONS_DATA[i],
                    $button = null;

                $button = $(TEMPLATES['button']);
                $button.find('button').addClass(actionConfig.tile.class);
                $button.find('.btn-icon').addClass('icon-' + actionConfig.tile.icon);
                $button.find('.btn-label').text(actionConfig.tile.label);

                // store data
                $button.data('config', actionConfig);

                // append to bar
                this.$container.prepend($button);

                // bind click event
                $button.on('click', function(e) {
                    e.preventDefault();
                    var config = $(this).data('config');

                    switch (config.type) {
                        case "url":
                            helpgrandma.Page.navigate(((config.secure) ? 'https' : 'http') + '://' + config.href + '/');
                            break;
                        case "tel":
                            var wnd = window.open('tel:' + config.href);
                            setTimeout(function() {
                              wnd.close();
                            }, 1000);
                            break;
                        default:
                            console.log("missing type integration " + config.type);
                    }
                }); // jshint ignore:line

                // store reference
                ACTIONS_DATA[i].button = $button;
            }
        };

        init();
    };
}

helpgrandma.Page  = new Page();