const icons = {
    enabled: "./pdf.png",
    disabled: "./pdf-gs.png"
  };
 

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tab.url)
    if (tab.url.includes("https://chat.deepseek.com/")) {
      chrome.browserAction.setIcon({ tabId, path: icons.enabled });
      chrome.browserAction.setPopup({ popup: "DeepSeek2pdf.html" }); // your popup filename
    } else {
      chrome.browserAction.setIcon({ tabId, path: icons.disabled });
      chrome.browserAction.setPopup({ popup: "" });
    };
  });