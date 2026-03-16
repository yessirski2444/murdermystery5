let scene, camera, renderer, player;

function initGame() {
  document.getElementById('menu').style.display = 'none';
  
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 10);

  // Renderer
  renderer = new THREE.WebGLRenderer({canvas: document.getElementById('gameCanvas')});
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 20, 10);
  scene.add(light);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(TOWN_SIZE, TOWN_SIZE),
    new THREE.MeshStandardMaterial({color: 0x228B22})
  );
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  // Add residents
  RESIDENTS.forEach(resident => {
    const geometry = new THREE.BoxGeometry(1,2,1);
    const material = new THREE.MeshStandardMaterial({color: Math.random()*0xffffff});
    const avatar = new THREE.Mesh(geometry, material);
    avatar.position.set(Math.random()*TOWN_SIZE-TOWN_SIZE/2, 1, Math.random()*TOWN_SIZE-TOWN_SIZE/2);
    avatar.userData = resident;
    scene.add(avatar);
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Movement controls (basic WASD + mouse)
const keys = {};
document.addEventListener('keydown', e => keys[e.key.toLowerCase()]=true);
document.addEventListener('keyup', e => keys[e.key.toLowerCase()]=false);

function movePlayer(){
  if(keys['w']) camera.position.z -= 0.2;
  if(keys['s']) camera.position.z += 0.2;
  if(keys['a']) camera.position.x -= 0.2;
  if(keys['d']) camera.position.x += 0.2;
  requestAnimationFrame(movePlayer);
}
movePlayer();

// Menu functions
function startNewGame(){
  initGame();
  listSaves();
}

function resumeGame(slot){
  const save = loadGame(slot);
  if(save){
    // Restore camera/player positions etc.
    initGame();
    camera.position.set(save.camera.x, save.camera.y, save.camera.z);
    listSaves();
  }
}

// Auto-load saves for returning IPs
window.onload = listSaves;