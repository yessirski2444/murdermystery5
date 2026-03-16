// chatManager.js
// Creates floating speech bubbles over avatars

function showSpeechBubble(avatar, text, duration=4000){
  const div = document.createElement('div');
  div.className = 'speech-bubble';
  div.innerText = text;
  document.body.appendChild(div);

  function updatePosition(){
    const vector = new THREE.Vector3();
    avatar.getWorldPosition(vector);
    vector.project(camera);
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
    div.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
  }

  updatePosition();
  const interval = setInterval(updatePosition, 16);

  setTimeout(()=>{
    clearInterval(interval);
    div.remove();
  }, duration);
}