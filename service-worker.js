const icons = {
  enabled: "pdf.png",
  disabled: "pdf-gs.png"
};

chrome.tabs.onActivated.addListener(enableDisable);

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



async function enableDisable(activeInfo) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    const activeTab = tabs[0];
    console.log(activeTab)
    const xtabId = activeTab.id;


    const deepSeek = "https://chat.deepseek.com/"


    if (activeTab.url.includes(deepSeek)) {
      console.log("Is DeepSeek")
      enableIcon();
      enablePopup();
    } else {
      disableIcon();
      disablePopup();
      console.log("NOT DeepSeek")
    }

  });
  const x = await resolveAfter2Seconds(0);
}

async function moveToFirstPosition(activeInfo) {
  try {
    await chrome.tabs.move(activeInfo.tabId, { index: 0 });
    console.log("Success.");
  } catch (error) {
    if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
      setTimeout(() => moveToFirstPosition(activeInfo), 50);
    } else {
      console.error(error);
    }
  }
}

function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 0);
  });
}



// if (isWhitelisted(tab.url)) {
//   chrome.browserAction.setIcon({ tabId, path: icons.enabled });
//   chrome.browserAction.setPopup({ popup: "index.html" }); // your popup filename
// } else {
//   chrome.browserAction.setIcon({ tabId, path: icons.disabled });
//   chrome.browserAction.setPopup({ popup: "" });
// };