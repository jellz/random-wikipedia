const RANDOM_ARTICLE_URL = 'https://en.wikipedia.org/wiki/Special:Random';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ recurringRandom: false }, () => {
    console.log('RW - set default config values');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              // hostEquals:
              schemes: ['http', 'https']
            }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
  console.log('ON INSTALLED');
});

chrome.storage.sync.get(['recurringRandom'], (result) => {
  if (result.recurringRandom === true) startRandomCountdown();
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startRandomCountdown() {
  chrome.storage.sync.get(['recurringRandom'], (result) => {
    if (result.recurringRandom === true) {
      chrome.alarms.clearAll();
      chrome.alarms.create('rw-countdown', {
        periodInMinutes: getRandomInt(2, 60)
      });
      chrome.alarms.get('rw-countdown', (alarm) =>
        console.log('started countdown', alarm)
      );
    }
  });
}

function getRandomArticle() {
  chrome.tabs.create({ url: RANDOM_ARTICLE_URL });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== 'rw-countdown') return;
  getRandomArticle();
  startRandomCountdown();
});
