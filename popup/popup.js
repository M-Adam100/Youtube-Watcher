document.querySelector("button[id='Paste_Data']").addEventListener('click', () => {

    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs) => {
        const currentTab = tabs[0];
        chrome.tabs.executeScript(currentTab.id, { file: 'scripts/paste-data.js' });
    })
})

const setListUI = async () => {
    const listData = document.querySelector('[name="selectedList"]');
    chrome.storage.local.get(['characteristics'], (data) => {
        Object.keys(data.characteristics).forEach(item => {
            let option = document.createElement("option");
            option.value = item;
            option.text = item + "\n" + data.characteristics[item];
            listData.add(option);
        })
    });
};

setListUI();

document.querySelector("button[id='Get_Data']").addEventListener('click', () => {

    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs) => {
        const currentTab = tabs[0];
        chrome.tabs.executeScript(currentTab.id, { file: 'scripts/image-download.js' });
    })
    updateData();
})

document.querySelector("button[id='RESET']").addEventListener('click', () => {

    chrome.storage.local.set({ characteristics: {} })
    updateData();
})

const updateData = () => {
    document.querySelector('[name="selectedList"]').innerHTML = '';
}








