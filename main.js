// main.js

// ====== CONFIG ======
const TOWN_SIZE = 20; // 20x20 town blocks
const ASSET_PATH = './CityEnviroinmentPack2/'; // adjust if needed

// ====== THREE.js SETUP ======
let scene, camera, renderer;
let clock = new THREE.Clock();
let assets = {}; // store loaded models/textures

function initGame() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 2, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('gameCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(10, 20, 10);
    directional.castShadow = true;
    scene.add(directional);

    // Ground plane
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Load a model to test
    loadFBXModel('Parking_Meter/PlasticTrashBin.fbx', 'PlasticTrashBin', obj => {
        obj.scale.set(0.5, 0.5, 0.5);
        obj.position.set(0, 0, 0);
        scene.add(obj);
    });

    // Start animation loop
    animate();
}

// ====== MODEL LOADING ======
function loadFBXModel(path, name, onLoad) {
    const loader = new THREE.FBXLoader();
    loader.load(ASSET_PATH + path, obj => {
        obj.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        assets[name] = obj;
        if (onLoad) onLoad(obj);
    }, undefined, err => {
        console.error('Error loading FBX model:', path, err);
    });
}

// ====== ANIMATION LOOP ======
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Here you can add avatar animations or movement

    renderer.render(scene, camera);
}

// ====== MENU BUTTONS ======
function startNewGame() {
    initGame();
    console.log('New game started');
}

function resumeGame() {
    // TODO: implement resume save
    console.log('Resume game clicked (not implemented yet)');
}
