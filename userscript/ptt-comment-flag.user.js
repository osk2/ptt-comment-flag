// ==UserScript==
// @name        八卦插IP
// @namespace   https://github.com/osk2/ptt-comment-flag/
// @description 開門查 IP！彈指間讓跳板仔無所遁形
// @version     2.0
// @author      osk2
// @match       https://www.ptt.cc/bbs/*/M*
// @match       https://disp.cc/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/tippy.js/2.5.4/tippy.min.js
// @noframes
// @grant       none
// ==/UserScript==

(async () => {
  try {
    const HOST = 'https://osk2.me:9977';
    const ipValidation = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
    const siteConfig = {
      'www.ptt.cc': {
        selectors: ['.push-ipdatetime', '.f2']
      },
      'disp.cc': {
        selectors: ['.push-right', '.record']
      }
    };
    /* Get current site */
    const currentConfig = siteConfig[location.host];

    /* Query comments */
    const commentNodes = document.querySelectorAll(currentConfig.selectors.join(','));

    /* Filter out comment without ip */
    const validCommentNodes = [...commentNodes].filter(c => c.textContent.trim().match(ipValidation));

    /* Prepare data for request */
    const ipList = validCommentNodes.map(c => c.textContent.match(ipValidation)[0]);

    /* Make the request */
    const flags = (await axios.post(`${HOST}/ip`, { ip: ipList })).data;

    /* Genrate content to replace */
    const generateHTML = (ip, flag) => {
      const imagePath = flag.imagePath ? `${HOST}/${flag.imagePath}` : null;
      const imageTitle = `${flag.locationName || '未知國家'}`;
      const ipHTML = `<a data-flag href="https://www.google.com/search?q=${ip}" target="_blank" title="${imageTitle}">${ip}</a>`;
      
      if (!imagePath) {
        return ipHTML;
      } else {
        const imageHTML = `<img data-flag src="${imagePath}" title="${imageTitle}">`;
        return `${ipHTML} ${imageHTML}`;
      }
    };

    /* Replace content */
    [...validCommentNodes].forEach((node, index) => {
      const ip = node.innerHTML.match(ipValidation)[0];
      const htmlContent = generateHTML(ip, flags[index]);

      node.innerHTML = node.innerHTML.replace(ipValidation, htmlContent);
    });

    /* Initial tippy tooltip */
    tippy('[data-flag]', {
      arrow: true,
      size: 'large',
      placement: 'top',
      interactive: true
    });
  } catch (ex) {
    console.error(ex);
  }
})();

const styles = [
  "https://cdnjs.cloudflare.com/ajax/libs/tippy.js/2.5.4/tippy.css"
];

for(const css of styles) {
  const el = document.createElement('link');
  el.rel = 'stylesheet';
  el.type = 'text/css';
  el.href = css;
  document.head.appendChild(el);
}
