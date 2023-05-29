document.addEventListener("DOMContentLoaded", function() {
  var usernameInput = document.getElementById("usernameInput");
  var passwordInput = document.getElementById("passwordInput");
  var urlInput = document.getElementById("redirectLink");
  var saveButton = document.getElementById("saveButton");

  // Load the stored username and password values
  chrome.storage.local.get(["username", "password","redirectUrl"], function(result) {
    if (result.username) {
      usernameInput.value = result.username;
    }
    if (result.password) {
      passwordInput.value = result.password;
    }
    if(result.redirectUrl){
      urlInput.value = result.redirectUrl;
    }
  });

  // Save the username and password values
  saveButton.addEventListener("click", function() {
    var username = usernameInput.value;
    var password = passwordInput.value;
    var reUrl = urlInput.value;

    // Store the username and password values
    chrome.storage.local.set({ "username": username, "password": password,"redirectUrl":reUrl }, function() {
      // Close the popup window
      window.close();
    });
  });
});


