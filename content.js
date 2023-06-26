chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "fillForm") {
    fillForm(request.index);
    // console.log(request.index);
    sendResponse({ success: true });
  }else if (request.action === "keepalive") {
    console.log("Made by Naman Rai ♥");
    console.log("Star this repo on github: github.com/NAMANIND/Automatic-Wifi-Login ");
    console.log("Connect with me on linkedin: linkedin.com/in/namannrai ");
  }
});


function fillForm(index) {
  var usernameInput = document.querySelector('input[name="username"]');
  var passwordInput = document.querySelector('input[name="password"]');
 
   
 

  chrome.storage.local.get({ credentials: [] }, function(result) {
    var credentials = result.credentials;

    if (credentials.length > 0) {
      var firstCredential = credentials[index];
      var storedUsername = firstCredential.username || "";
      var storedPassword = firstCredential.password || "";
      var storedUrl = firstCredential.redirectUrl || "www.youtube.com/";



  


      if (usernameInput && passwordInput && storedUsername && storedPassword) {
        usernameInput.value = storedUsername;
        passwordInput.value = storedPassword;

        var form = usernameInput.closest('form');
        if (form) {
          form.submit();

          function openNewTab(url) {
            window.open(url, '_blank');
          }
       
          
          if ( window.location.href.includes("?") && !window.location.href.includes("logout")  && !window.location.href.includes("keepalive")) {
              if (!storedUrl.startsWith('http://') && !storedUrl.startsWith('https://')) {
                storedUrl = 'https://' + storedUrl;
              }
              openNewTab(storedUrl);
         }
        }



       
      }
    }
  });
}


