const icons = {
  enabled: "pdf.png",
  disabled: "pdf-gs.png"
};

// chrome tabs events
// when user activate a tab
chrome.tabs.onActivated.addListener(eventCallback);
// when user highlight
chrome.tabs.onHighlighted.addListener(eventCallback);
// when user change the current URL in the tab
chrome.tabs.onUpdated.addListener(onUpdatedEventHandler);

// Enable/Disable Extension
function enableExtension(flag) {
  if (flag) {
    chrome.action.setIcon({ path: icons.enabled });
    chrome.action.setPopup({ popup: "DeepSeek2pdf.html" });
    return;
  }
  chrome.action.setPopup({ popup: "" });
  chrome.action.setIcon({ path: icons.disabled });
}

async function onUpdatedEventHandler(tabId, changeInfo, tab) {
  const deepSeek = "https://chat.deepseek.com/"
  if (tab.url.includes(deepSeek)) {
    enableExtension(true);
  } else {
    enableExtension(false);
  }
}

function eventCallback(activeInfo) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    const deepSeek = "https://chat.deepseek.com/"

    if (activeTab.url.includes(deepSeek)) {
      enableExtension(true);
    } else {
      enableExtension(false);
    }
  });
}
