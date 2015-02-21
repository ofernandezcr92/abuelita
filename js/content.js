var chrome = chrome || {};

chrome.runtime.onMessage.addListener(
    function(request /*, sender, sendResponse*/) {
        switch(request.action) {
            case "init":
                var frame = chrome.extension.getURL("frame.html");
                $.get(frame, function(response) {
                    $("body").prepend(response);
                });
                break;
        }
    }
);