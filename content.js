console.log('content script is running')
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "newgame"){
            console.log('newgame')
            sendResponse({ farewell: "userwantsanewgame" });
        }
        if (request.message === "highscore") {
            console.log('highscore')
            sendResponse({ farewell: "highscore" });
        }
        if (request.message === "exit") {
            console.log('exit')
            sendResponse({ farewell: "exit" });
        }
    }
);

