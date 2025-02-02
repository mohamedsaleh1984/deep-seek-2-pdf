const icons = {
  enabled: "pdf.png",
  disabled: "pdf-gs.png"
};

chrome.tabs.onActivated.addListener((info) => {
  // console.log(tab.url)
  // const tabId = info.tabId
  // if (info.url.includes("https://chat.deepseek.com")) {
  //   chrome.browserAction.setIcon({ tabId, path: icons.enabled });
  //   chrome.browserAction.setPopup({ popup: "DeepSeek2pdf.html" }); // your popup filename
  // } else {
  //   chrome.browserAction.setIcon({ tabId, path: icons.disabled });
  //   chrome.browserAction.setPopup({ popup: "" });
  // };

  var tab = chrome.tabs.get(info.tabId, function (tab) {
    localStorage["current_url"] = tab.url;
  });
});