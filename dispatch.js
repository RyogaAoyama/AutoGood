document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("autoGoodBtn").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {}, function(res) {
        console.log("aa");
        console.log(res);
      });
    });
  });
});
