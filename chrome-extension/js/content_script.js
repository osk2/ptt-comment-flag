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
