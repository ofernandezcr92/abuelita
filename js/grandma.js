var chrome = chrome || {};

chrome.webNavigation.onCompleted.addListener(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "init" });
    });
});