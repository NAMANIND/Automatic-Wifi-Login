var index = 0;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && (tab.url.startsWith("http://192.168.") && !(tab.url.includes('keepalive?') ))) {
    chrome.storage.local.get({ credentials: [] }, function(result) {
      var credentials = result.credentials;
      if (index >= credentials.length) {
        index = 0; // Reset the index to 0 if it exceeds the credentials length
      }
      chrome.tabs.sendMessage(tabId, {
        action: "fillForm",
        index: index,
        credentials: credentials
      }, function(response) {
        if (response.success) {
          index++; // Increment the index
        }
      });
    });
  }
  
});
  

  const refreshInterval = 2000000; // Refresh every 2000 seconds (33 minutes)
  const tabsToRefresh = {};
  

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.includes('keepalive?')) {
      if (!tabsToRefresh[tabId]) {
        tabsToRefresh[tabId] = true;
        startRefreshing(tabId);
      }
    }
  });
  
  function startRefreshing(tabId) {
    chrome.tabs.reload(tabId);
    setInterval(function () {
      chrome.tabs.reload(tabId);
    }, refreshInterval);
  }
  
  
  