







chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "fillForm") {
      fillForm();
    }
  });
  

//   chrome.storage.local.remove(["username", "password", "redirectUrl"], function() {
//     console.log("Values cleared.");
//   });

  function fillForm() {
    var usernameInput = document.querySelector('input[name="username"]');
    var passwordInput = document.querySelector('input[name="password"]');
    // var reUrlInput = document.querySelector('input[name="redirectUrl"]');
    
    chrome.storage.local.get(["username", "password","redirectUrl"], function(result) {
      var storedUsername = result.username || "";
      var storedPassword = result.password || "";
      var storedreURl = result.redirectUrl || "www.youtube.com/";


      
      if (usernameInput && passwordInput && storedUsername && storedPassword) {
        usernameInput.value = storedUsername;
        passwordInput.value = storedPassword;
        // reUrlInput.value = storedreURl;
    
        var form = usernameInput.closest('form');
        if (form) {
          form.submit();
        }
        
        function openNewTab(url) {
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
          }
          window.open(url, '_blank');
        }
        
        // Example usage
        openNewTab(storedreURl );
      }
    });
  }
  
  // Automatically fill the form after 5 seconds of page load
  setTimeout(function() {
    fillForm();
  }, 2000);

  console.log("Made by Naman Rai ♥");
    console.log("Follow me on github: github.com/NAMANIND");
  

