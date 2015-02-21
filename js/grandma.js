// document.addEventListener('DOMContentLoaded', function() {
    // $("body").append('Test');
    // alert(10);1
    // chrome.tabs.update({
    //     url: "http://www.gmail.com/"
    // });
// });

chrome.webNavigation.onCompleted.addListener(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        console.log(response.farewell);
      });
    });
});