let timeLeft;
let countdownInterval;
let tabId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'start_countdown') {
    if (!countdownInterval) {
      tabId = request.tabId;
      timeLeft = 10 * 60;
      countdownInterval = setInterval(updateCountdown, 1000);
    }
  } else if (request.message === 'stop_countdown') {
    clearInterval(countdownInterval);
    countdownInterval = null;
  } else if (request.message === 'get_time_left') {
    sendResponse(timeLeft);
  }
});

function updateCountdown() {
  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    countdownInterval = null;
    chrome.tabs.reload(tabId);
    timeLeft = 10 * 60;
    countdownInterval = setInterval(updateCountdown, 1000);
  } else {
    timeLeft--;
  }
}
