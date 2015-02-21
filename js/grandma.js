var chrome = chrome || {},
    grandma = grandma || {};

function ActionsHandler() {

    var ACTIONS = [
        {
            prefix: "mail.google.com/*",
            action: "mail"
        },
        {
            prefix: "www.google.com/*",
            action: "search"
        }
    ];

    // this.handlers = [];

    this.registerAllListeners = function() {
        for (var i = ACTIONS.length - 1; i >= 0; i--) {
            this.registerListener(ACTIONS[i]);
        }
    };

    this.registerListener = function(action) {
        var self = this;

        chrome.webNavigation.onCompleted.addListener(function(object) {
            var type = self.getActionType(object.url);

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "launch",  type: type});
            });
        }, {
            url: [{
                urlMatches: action.prefix
            }]
        });
    };

    this.getActionType = function(url) {
        for (var i = ACTIONS.length - 1; i >= 0; i--) {
            var re = new RegExp(ACTIONS[i].prefix);
            if (url.match(re)) {
                return ACTIONS[i].action;
            }
        }
    };

    this.navigate = function(url) {
        chrome.tabs.update({
            url: url
        });
    };
    // init();
}

// chrome.webNavigation.onCompleted.addListener(function() {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { action: "init" });
//     });
// });

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

    // register listening actions
    chrome.runtime.onMessage.addListener(function(request) {
        switch(request.action) {
            case 'navigate':
                actionsHandler.navigate(request.url);
                break;
            default:
                console.log('Invalid action');
        }
    });
})();

