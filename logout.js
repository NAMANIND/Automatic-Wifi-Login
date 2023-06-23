function logout() {
    chrome.storage.local.get("keepaliveUrl", function(result) {
      var savedUrl = result.keepaliveUrl;
      console.log("URL with 'keepalive': " + savedUrl);
      var modifiedUrl = savedUrl.replace("keepalive", "logout");
  
      window.open(modifiedUrl);
    });
  }
  
  // Example usage: Call the function when a button is clicked
  var myButton = document.getElementById("logout");
  myButton.addEventListener("click", logout);

    function login() {
        window.open("http://www.gstatic.com/generate_204");
    }

    var myButton2 = document.getElementById("login");
    myButton2.addEventListener("click", login);