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

});

exit.addEventListener('click', () => {
    console.log('exit');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "exit" });
    });

});

chrome.storage.local.get(['highscore'],(data)=>{
    highscore.textContent += data['highscore'];
})

chrome.storage.onChanged.addListener((changes, local)=>{
 alert(changes["highscore"]);
})

