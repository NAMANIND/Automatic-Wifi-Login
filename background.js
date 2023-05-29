chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.url.startsWith("http://192.168.")) {
      chrome.tabs.sendMessage(tabId, {
        action: "fillForm"
      });
    }
  });
  