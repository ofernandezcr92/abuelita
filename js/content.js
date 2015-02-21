var chrome = chrome || {},
    helpgrandma = helpgrandma || {},
    console = console || {};

chrome.runtime.onMessage.addListener(
    function(request) {
        switch(request.action) {
            case "init":
                helpgrandma.Page.openSideBar();
                break;
            case "launch":
                helpgrandma.Page.launch(request.type);
                break;
            default:
                console.log("Invalid action");
        }
    }
);