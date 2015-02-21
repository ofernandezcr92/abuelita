var chrome = chrome || {};

var chrome = chrome || {},
    helpgrandma = helpgrandma || {},
    console = console || {};

chrome.runtime.onMessage.addListener(
    function(request /*, sender, sendResponse*/) {
        switch(request.action) {
            case "init":
                helpgrandma.Page.openSideBar();
                break;
            case "launch":
                helpgrandma.Page.launch();
                break;
            default:
                console.log("Invalid action");
        }
    }
);



