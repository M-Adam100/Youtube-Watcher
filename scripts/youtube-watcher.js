(async () => {
    chrome.storage.local.get(['keywords'], CS => {
        console.log(CS);
        const keywords = CS.keywords.split(',');
        console.log(keywords);
        for (let i = 0; i < keywords.length; i++) {
            const youtubeSearchBox = document.querySelector('ytd-searchbox');
            const input = youtubeSearchBox.querySelector('#search');
            input.value = keywords[i];
            input.dispatchEvent(new Event('input', {bubbles: true}))
            youtubeSearchBox.querySelector('#search-icon-legacy').click();
        }
    })
})()