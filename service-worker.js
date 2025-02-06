const icons = {
  enabled: "pdf.png",
  disabled: "pdf-gs.png"
};

// chrome tabs events
// when user activate a tab
chrome.tabs.onActivated.addListener(enableDisable);
// when user highlight
chrome.tabs.onHighlighted.addListener(enableDisable);
// when user change the current URL in the tab
chrome.tabs.onUpdated.addListener(onUpdatedEventHandler);


function enableExtension(flag) {
  console.log('enableExtension ', flag)
  if (flag) {
    chrome.action.setIcon({ path: icons.enabled });
    chrome.action.setPopup({ popup: "DeepSeek2pdf.html" });
    return;
  }
  chrome.action.setPopup({ popup: "" });
  chrome.action.setIcon({ path: icons.disabled });
}

async function onUpdatedEventHandler(tabId, changeInfo, tab) {
  console.log('onUpdatedEventHandler ', tab)
  const deepSeek = "https://chat.deepseek.com/"
  if (tab.url.includes(deepSeek)) {
    enableExtension(true);
  } else {
    enableExtension(false);
  }
}

function enableDisable(activeInfo) {
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
