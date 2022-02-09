document.querySelector('#Launch').addEventListener('click', () => {
	chrome.storage.local.get(['keywords'], CS => {
		if (CS.keywords) {
			const query = { active: true, currentWindow: true };
			function callback(tabs) {
				const currentTab = tabs[0];
				chrome.scripting.executeScript(
					{
						target: { tabId: currentTab.id },
						files: ['scripts/youtube-watcher.js']
					},
					() => { console.log("Executed Script") });
			}

			chrome.tabs.query(query, callback);
		}
	})
})

document.querySelector('#Save').addEventListener('click', () => {
	const keywords = document.querySelector('#keywords').value;
	const delay = document.querySelector('#delay').value;
	if (keywords) {
		chrome.storage.local.set({
			keywords: keywords,
			delay: delay

		})
	}
})


const setValues = () => {
	chrome.storage.local.get(['keywords', 'delay'], CS => {
		if (CS.keywords) {
			document.querySelector('#keywords').value = CS.keywords;
			document.querySelector('#delay').value = CS.delay;
		}

	})
}

setValues();







