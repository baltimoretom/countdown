let countdownDiv;
let countdownInterval;

document.addEventListener('DOMContentLoaded', () => {
  countdownDiv = document.getElementById('countdown');
  chrome.tabs.query({ active: true, currentWindow: true }, ([currentTab]) => {
    document.getElementById('startCountdown').addEventListener('click', () => {
      chrome.runtime.sendMessage({ message: 'start_countdown', tabId: currentTab.id });
      if (!countdownInterval) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
      }
    });
  });
});

function updateCountdown() {
  chrome.runtime.sendMessage({ message: 'get_time_left' }, (response) => {
    if (typeof response !== 'undefined') {
      const timeLeft = response;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      countdownDiv.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  });
}
