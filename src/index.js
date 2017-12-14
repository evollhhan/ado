function msg(text) {
  const p = document.createElement('p');
  p.textContent = text;
  document.body.appendChild(p);
}

try {
  var audio = document.createElement('audio');
  audio.addEventListener('canplay', () => {
    msg('load realy');
    audio.play().then(() => {
      msg('success');
    }).catch(e => {
      msg('error!');
      alert(e);
    })
  });
  msg('start load');
  audio.src = 'music.mp3';
} catch (e) {
  alert(e.message);
}
