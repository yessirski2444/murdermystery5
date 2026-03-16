const MAX_SAVES = 3;

function saveGame(slot, data) {
  if(slot < 1 || slot > MAX_SAVES) return;
  localStorage.setItem(`murderSave${slot}`, JSON.stringify(data));
}

function loadGame(slot) {
  const data = localStorage.getItem(`murderSave${slot}`);
  return data ? JSON.parse(data) : null;
}

function listSaves() {
  let saveOptions = '';
  for(let i=1;i<=MAX_SAVES;i++){
    const save = loadGame(i);
    if(save){
      saveOptions += `<button onclick="resumeGame(${i})">Resume Save ${i}</button>`;
    }
  }
  document.getElementById('save-options').innerHTML = saveOptions;
}