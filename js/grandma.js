document.addEventListener('DOMContentLoaded', function() {
    $("body").append('Test');
    chrome.tabs.update({
        url: "http://www.gmail.com/"
    });
});