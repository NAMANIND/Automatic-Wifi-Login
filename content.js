







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



      function openNewTab(url) {
        window.open(url, '_blank');
      }
    
      var storedUrl = result.redirectUrl || "www.youtube.com/";
      
      if (window.location.href.includes("keepalive")) {
          if (!storedUrl.startsWith('http://') && !storedUrl.startsWith('https://')) {
            storedUrl = 'https://' + storedUrl;
          }
          openNewTab(storedUrl);
      }



      var storedUsername = result.username || "";
      var storedPassword = result.password || "";
      


      
      if (usernameInput && passwordInput && storedUsername && storedPassword) {
        usernameInput.value = storedUsername;
        passwordInput.value = storedPassword;
     
    
        var form = usernameInput.closest('form');
        if (form) {
          form.submit();
        }

    
    
      } 
    });
  }




  console.log("Made by Naman Rai ♥");
  console.log("Follow me on github: github.com/NAMANIND");
  

