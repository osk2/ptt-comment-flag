// ==UserScript==
// @name        八卦插IP
// @namespace   https://github.com/osk2/ptt-comment-flag/
// @description 開門！查IP
// @version     1.5
// @author      osk2
// @match       https://www.ptt.cc/bbs/Gossiping/M*
// @match       https://www.ptt.cc/bbs/gossiping/M*
// @require     https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js
// @noframes
// @grant       none
// ==/UserScript==

(function () {
  'use strict';

  +(async () => {
    try {
      const HOST = 'https://osk2.me:9977';
      const comment = document.querySelectorAll('.push-ipdatetime');
      const commentArray = Array.from(comment);
      const ipList = commentArray.map(node => node.textContent.trim().split(' ')[0]);
      const flagsResponse = await axios.post(`${HOST}/ip`, { ip: ipList });
      const flags = flagsResponse.data;
    
      commentArray.forEach((comment, index) => {
        const datetime = comment.textContent.trim().split(' ').splice(1, 2).join(' ');
        const imagePath = flags[index].imagePath ? `${HOST}/${flags[index].imagePath}` : null;
        const imageTitile = flags[index].locationName;
        const imageHTML = `<img src="${imagePath}" title="${imageTitile}">`;
    
        if (!imagePath) {
          return;
        }
        comment.innerHTML = `${imageHTML} ${datetime}`;
      });
    } catch (ex) {
      console.error(ex);
    }
  })();

}());
