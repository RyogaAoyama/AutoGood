document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("autoGoodBtn").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "request" });
    });
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // responseだったらログを出力して処理終了
  if (msg.type == "response") {
    document.getElementById("log").innerHTML = msg.notice;
  }
});
