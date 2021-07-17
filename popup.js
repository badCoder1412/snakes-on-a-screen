console.log('popjs is running');
let params = {
    active: true,
    currentWindow: true
}

const newgame = document.getElementById('newgame');
const highscore = document.getElementById('highscore');
const exit  = document.getElementById('exit');

newgame.addEventListener('click',() => {
    console.log('newgame');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "newgame" });
    });

})
// highscore.addEventListener('click', () => {
//     console.log('highscore');
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, { "message": "highscore" });
//     });

// })
exit.addEventListener('click', () => {
    console.log('exit');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "exit" });
    });

})

