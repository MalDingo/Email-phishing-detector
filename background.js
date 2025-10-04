chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "authenticated") {
    chrome.identity.getAuthToken({ interactive: false }, (token) => {
      if (token) {
        chrome.storage.local.set({ authToken: token }, () => {
          console.log("Token stored:", token);
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "reanalyze" });
          });
        });
      }
    });
  }
});