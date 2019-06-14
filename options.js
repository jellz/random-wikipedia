// Saves options to chrome.storage
function saveOptions() {
  var recurringRandom = document.getElementById('config-recurring-random')
    .checked;
  chrome.storage.sync.set(
    {
      recurringRandom
    },
    () => {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Use default value recurringRandom = false
  chrome.storage.sync.get(
    {
      recurringRandom: false
    },
    (items) => {
      document.getElementById('config-recurring-random').checked =
        items.recurringRandom;
    }
  );
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
