// ==UserScript==
// @name        八卦插IP
// @namespace   https://github.com/osk2/ptt-comment-flag/
// @description 開門！查IP
// @version     1.6
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
    const comments = document.querySelectorAll('.push-ipdatetime');
    const ipList = [].map.call(comments, node => node.textContent.trim().split(' ')[0]);
    const flagsResponse = await axios.post(`${HOST}/ip`, { ip: ipList });
    const flags = flagsResponse.data;
  
    [].forEach.call(comments, (comment, index) => {
      const commentInfo = comment.textContent.trim().split(' ');
      const commentIp = commentInfo[0];
      const commentId = comment.previousSibling.previousSibling.innerHTML;
      const commentDatetime = commentInfo.splice(1, 2).join(' ');
      const imagePath = flags[index].imagePath ? `${HOST}/${flags[index].imagePath}` : null;
      const imageTitile = `${flags[index].locationName || 'N/A'}<br>
        <a href='https://www.google.com/search?q=${commentId}+${commentIp}' target='_blank'>${commentIp}</a>`;
      const imageHTML = `<img data-flag src="${imagePath}" title="${imageTitile}">`;
  
      if (!imagePath) {
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
