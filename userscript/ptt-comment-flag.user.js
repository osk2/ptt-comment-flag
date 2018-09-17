// ==UserScript==
// @name        八卦插IP
// @namespace   https://github.com/osk2/ptt-comment-flag/
// @description 開門！查IP
// @version     1.7
// @author      osk2
// @match       https://www.ptt.cc/bbs/Gossiping/M*
// @match       https://www.ptt.cc/bbs/gossiping/M*
// @require     https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/tippy.js/2.5.4/tippy.min.js
// @noframes
// @grant       none
// ==/UserScript==

(async () => {
  try {
    const HOST = 'https://osk2.me:9977';
    const ipValidation = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
    const comments = document.querySelectorAll('.push-ipdatetime');
    const f2Nodes = document.querySelectorAll('.f2');
    const authorComment = [].filter.call(f2Nodes, n => n.innerHTML.match(ipValidation));
    const authorIpList = authorComment.map(c => c.innerHTML.match(ipValidation)[0]);
    const commentIpList = [].map.call(comments, n => n.textContent.trim().split(' ')[0]);
    const authorFlagsResponse = await axios.post(`${HOST}/ip`, { ip: authorIpList });
    const authorFlags = authorFlagsResponse.data;

    const generateImageHTML = (ip, flag) => {
      const imagePath = flag.imagePath ? `${HOST}/${flag.imagePath}` : null;
      const imageTitile = `${flag.locationName || 'N/A'}<br>
        <a href='https://www.google.com/search?q=${ip}' target='_blank'>${ip}</a>`;
      
      if (!imagePath) {
        return;
      }
      return `<img data-flag src="${imagePath}" title="${imageTitile}">`;
    };

    authorComment.forEach((comment, index) => {
      const ip = comment.innerHTML.match(ipValidation)[0];
      const imageHTML = generateImageHTML(ip, authorFlags[index]);

      if (!imageHTML) {
        return;
      }
      comment.innerHTML = comment.innerHTML.replace(ipValidation, `${imageHTML} ${ip}`);
    });

    if (commentIpList.lenth === 0) {
      return;
    }

    const commentFlagsResponse = await axios.post(`${HOST}/ip`, { ip: commentIpList });
    const flags = commentFlagsResponse.data;
  
    [].forEach.call(comments, (comment, index) => {
      const commentInfo = comment.textContent.trim().split(' ');
      const commentIp = commentInfo[0];
      const commentDatetime = commentInfo.splice(1, 2).join(' ');
      const imageHTML = generateImageHTML(commentIp, flags[index]);
  
      if (!imageHTML) {
        return;
      }
      comment.innerHTML = `${imageHTML} ${commentDatetime}`;
    });

    tippy('[data-flag]', {
      arrow: true,
      size: 'large',
      placement: 'left',
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
