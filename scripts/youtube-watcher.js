(async () => {
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const removeCookies = () => {
      chrome.runtime.sendMessage({
          message: 'CLEAR'
      })
      Object.keys(localStorage).forEach(key => {
          localStorage.removeItem(key);
      })
    }

    const setInputValue = async (element, value) => {
        return new Promise(async (resolve, reject) => {
            await sleep(2000);
            element.value = value;
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new InputEvent('change', { bubbles: true }));
            element.dispatchEvent(new FocusEvent('blur', { bubbles: true }))
            resolve(true);
        })
    }

    const readLocalStorage = async (key) => {
        return new Promise((resolve, reject) => {
          chrome.storage.local.get([key], function (result) {
            if (result[key] === undefined) {
              reject();
            } else {
              resolve(result[key]);
            }
          });
        });
      };

    const getFirstVideo = async () => {
        return new Promise(async (resolve, reject) => {
            const interval = setInterval(async () => {
                if (document.querySelector('ytd-video-renderer') && window.location.href.includes('search') && !document.querySelector('ytd-search').hidden) {
                    clearInterval(interval);
                    await sleep(2500);
                    document.querySelector('ytd-video-renderer').querySelector('a').click();
                    resolve(true);
                } else {
                    document.querySelector('#search-icon-legacy').dispatchEvent(new PointerEvent('click', { bubbles: true }))
                }
            }, 2000)
        })
    }
        const keywordsString = await readLocalStorage('keywords');
        const delay = Number(await readLocalStorage('delay'));
        const keywords = keywordsString.split(',');
        for (let i = 0; i < keywords.length; i++) {
            removeCookies();
            const youtubeSearchBox = document.querySelector('ytd-searchbox');
            const input = youtubeSearchBox.querySelector('#search');
            await setInputValue(input, keywords[i]);
            await getFirstVideo();
            await sleep((delay*1000)*60);
        }
})()