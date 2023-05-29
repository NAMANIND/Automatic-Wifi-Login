let isFormFilled = false;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (!isFormFilled && changeInfo.status === "complete" && tab.url.startsWith("http://192.168.")) {
    chrome.tabs.sendMessage(tabId, {
      action: "fillForm"
    });
    
    isFormFilled = true; // Set the flag to true to indicate that the form has been filled once
  }
});
