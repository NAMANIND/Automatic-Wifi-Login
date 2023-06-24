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





  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.url.includes("keepalive")) {
      chrome.tabs.get(tabId, function(updatedTab) {
        var currentUrl = updatedTab.url;
        // console.log("URL with 'keepalive': " + currentUrl);
        
        // Save the URL in Chrome storage
        chrome.storage.local.set({ keepaliveUrl: currentUrl }, function() {
          console.log("URL saved: " + currentUrl);
        });
      });
    }
  });
  



  

  const refreshInterval = 1000000; // Refresh every 1000 seconds (16.6667 minutes)
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
  
  
  