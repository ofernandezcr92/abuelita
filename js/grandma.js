// document.addEventListener('DOMContentLoaded', function() {
    // $("body").append('Test');
    // alert(10);1
    // chrome.tabs.update({
    //     url: "http://www.gmail.com/"
    // });
// });

chrome.webNavigation.onCompleted.addListener(function() {
    $("body").append("<div>Hello Oscar!</div>");
    console.log(12312321414);
});