var console = console || {},
    chrome = chrome || {},
    grandma = grandma || {};

var ACTIONS = ["mail", "search", "call", "play"],
    ACTIONS_DATA = {};

function ActionsHandler() {
    this.registerAllListeners = function() {
        for (var i = ACTIONS.length - 1; i >= 0; i--) {
            this.registerListener(ACTIONS[i]);
        }
    };

    this.registerListener = function(action) {
        $.getJSON(chrome.extension.getURL("js/tutorials/" + action + "/config.json"), function(config) {
            ACTIONS_DATA[action] = config;
        });
    };

    this.getActionFromUrl = function(url) {
        for (var i in ACTIONS) {
            var actionName = ACTIONS[i];
            if (ACTIONS_DATA.hasOwnProperty(actionName)) {
                var actionConfig = ACTIONS_DATA[actionName];
                if (actionConfig.type === "url" && url.match(new RegExp(actionConfig.href))) {
                    return actionName;
                }
            }
        }
    };

    this.navigate = function(url) {
        chrome.tabs.update({
            url: url
        });
    };
}

(function(){
    // register listener for page load event
    chrome.webNavigation.onCompleted.addListener(function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "init" });
        });
    });

    // register specific handlers
    var actionsHandler = new ActionsHandler();
    actionsHandler.registerAllListeners();

    // register web page on completed loading handler
    chrome.webNavigation.onCompleted.addListener(function(object) {
        var type = actionsHandler.getActionFromUrl(object.url);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "launch",  type: type});
        });
    });

    // register listening actions
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        switch(request.action) {
            case 'navigate':
                actionsHandler.navigate(request.url);
                break;
            case 'getData':
                sendResponse(ACTIONS_DATA);
                break;
            default:
                console.log('Invalid action');
        }
    });
})();

