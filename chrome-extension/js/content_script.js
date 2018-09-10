'use strict';

const HOST = 'https://osk2.me:9977';
const comment = document.querySelectorAll('.push-ipdatetime');
const commentArray = Array.from(comment);
const ipList = commentArray.map(node => node.textContent.trim().split(' ')[0]);

+(async () => {
  try {
    const flagsResponse = await fetch(`${HOST}/ip`, {
      method: 'POST',
      body: JSON.stringify({ ip: ipList }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    const flags = await flagsResponse.json();
  
    commentArray.forEach((comment, index) => {
      const datetime = comment.textContent.trim().split(' ').splice(1, 2).join(' ');
      const imagePath = `${HOST}/${flags[index].imagePath}`;
      const imageTitile = flags[index].locationName;
  
      comment.innerHTML = `<img src="${imagePath}" title="${imageTitile}"> ${datetime}`;
    });
  } catch (ex) {
    console.error(ex);
  }
})();
