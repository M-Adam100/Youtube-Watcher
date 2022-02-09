chrome.runtime.onInstalled.addListener(async () => {
    console.log("Extension Installed")
});


chrome.runtime.onMessage.addListener((request) => {
    console.log(request)
    if (request.message == "CLEAR") {
        chrome.cookies.getAll({domain: "youtube.com"}, function(cookies) {
            for(var i=0; i<cookies.length;i++) {
                chrome.cookies.remove({url: "http://youtube.com" + cookies[i].path, name: cookies[i].name});
            }
        });
    }
  
})