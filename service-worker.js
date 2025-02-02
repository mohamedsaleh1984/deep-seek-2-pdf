const icons = {
  enabled: "pdf.png",
  disabled: "pdf-gs.png"
};

chrome.tabs.onActivated.addListener(enableDisable);
chrome.tabs.onHighlighted.addListener(enableDisable);
chrome.tabs.onUpdated.addListener(onUpdatedEventHandler)


function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 0);
  });
}


async function disableIcon() {
  return chrome.action.setIcon({ path: icons.disabled });
}
async function disablePopup() {
  return chrome.action.setPopup({ popup: "" });
}


async function enableIcon() {
  return chrome.action.setIcon({ path: icons.enabled });
}

async function enablePopup() {
  return chrome.action.setPopup({ popup: "DeepSeek2pdf.html" });
}

async function onUpdatedEventHandler(tabId, changeInfo, tab) {
  const deepSeek = "https://chat.deepseek.com/"
  if (tab.url.includes(deepSeek)) {
    enableIcon();
    enablePopup();
  } else {
    disableIcon();
    disablePopup();
  }
  await resolveAfter2Seconds(0);
}



async function enableDisable(activeInfo) {
  
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    const activeTab = tabs[0];
    const deepSeek = "https://chat.deepseek.com/"

    if (activeTab.url.includes(deepSeek)) {
      enableIcon();
      enablePopup();
    } else {
      disableIcon();
      disablePopup();
    }

  });
  await resolveAfter2Seconds(0);
}
