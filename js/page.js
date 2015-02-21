var helpgrandma = helpgrandma || {},
    chrome = chrome || {};

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
                $("body").prepend(response);
            });

        this.isInit = true;
    };

    this.navigate = function(url){
        chrome.tabs.update({
            url: url
        });
    };

    this.launch = function() {
        // do something here to launch help
    };
}

helpgrandma.Page  = new Page();