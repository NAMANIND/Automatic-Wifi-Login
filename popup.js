document.addEventListener("DOMContentLoaded", function() {
  var usernameInput = document.getElementById("usernameInput");
  var passwordInput = document.getElementById("passwordInput");
  var urlInput = document.getElementById("redirectLink");
  var saveButton = document.getElementById("saveButton");
  var saveddata = document.getElementById("savedData");
  var credentialsList = document.getElementById("credentialsList");

  // Load the stored credentials
  chrome.storage.local.get({ credentials: [] }, function(result) {
    var credentials = result.credentials;
    displayCredentials(credentials);
    if(credentials.length == 0) {
      saveddata.style.display = "none";
    }
  });

  // Save the new credentials
  saveButton.addEventListener("click", function() {
    var username = usernameInput.value;
    var password = passwordInput.value;
    var redirectUrl = urlInput.value;

    // Retrieve the existing credentials from storage
    chrome.storage.local.get({ credentials: [] }, function(result) {
      var credentials = result.credentials;

      // Add the new credentials to the array
      credentials.push({ username: username, password: password, redirectUrl: redirectUrl });

      // Save the updated credentials array
      chrome.storage.local.set({ credentials: credentials }, function() {
        displayCredentials(credentials);
        clearInputs();
      });
    });
  });



  // Display the credentials in the popup
  function displayCredentials(credentials) {
    credentialsList.innerHTML = "";
    for (var i = 0; i < credentials.length; i++) {
      var credential = credentials[i];
      var listItem = document.createElement("li");

      var username = document.createElement("h3");

      username.textContent = credential.username;

      var removeButton = document.createElement("div");
      removeButton.textContent = "X";
      removeButton.addEventListener("click", (function(index) {
        return function() {
          removeCredential(index);
        };
      })(i));

      listItem.appendChild(username);
      listItem.appendChild(removeButton);
      credentialsList.appendChild(listItem);
    }
  }


    // Remove a credential from the array
    function removeCredential(index) {
      // Retrieve the existing credentials from storage
      chrome.storage.local.get({ credentials: [] }, function(result) {
        var credentials = result.credentials;
  
        // Remove the credential at the specified index
        credentials.splice(index, 1);
  
        // Save the updated credentials array
        chrome.storage.local.set({ credentials: credentials }, function() {
          displayCredentials(credentials);
        });
      });
    }

  // Clear the input fields
  function clearInputs() {
    usernameInput.value = "";
    passwordInput.value = "";
    urlInput.value = "";
    window.close();
  }
});
