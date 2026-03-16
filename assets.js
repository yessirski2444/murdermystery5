// assets.js
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const Assets = {
    models: {},
    textures: {},
    sounds: {}
};

const textureLoader = new THREE.TextureLoader();
const fbxLoader = new FBXLoader();
const gltfLoader = new GLTFLoader();
const audioLoader = new THREE.AudioLoader();
export const listener = new THREE.AudioListener(); // attach this to your camera

// ------------------- TEXTURES -------------------
const textureFiles = [
  "./CityEnviroinmentPack2/Parking_Meter/PlasticTrashBin_Base_Color.png",
  "./CityEnviroinmentPack2/Parking_Meter/PlasticTrashBin_Metallic.png",
  "./CityEnviroinmentPack2/Parking_Meter/PlasticTrashBin_Height.png",
  "./CityEnviroinmentPack2/Parking_Meter/PlasticTrashBin_Roughness.png",
  "./CityEnviroinmentPack2/Parking_Meter/PlasticTrashBin_Normal_DirectX.png",
  "./CityEnviroinmentPack2/Realistic Electrical Box/Electric.1_Metallic.png",
  "./CityEnviroinmentPack2/Realistic Electrical Box/Electric.1_Roughness.png",
  "./CityEnviroinmentPack2/Realistic Electrical Box/Electric.1_Height.png",
  "./CityEnviroinmentPack2/Realistic Electrical Box/Electric.1_Normal.png",
  "./CityEnviroinmentPack2/Realistic Electrical Box/Electric.1_Base_Color.png",
  "./CityEnviroinmentPack2/Outdoor_Table/Umbrella_Normal_DirectX.png",
  "./CityEnviroinmentPack2/Outdoor_Table/Umbrella_Base_Color.png",
  "./CityEnviroinmentPack2/Outdoor_Table/Umbrella_Roughness.png",
  "./CityEnviroinmentPack2/Outdoor_Table/Umbrella_Opacity.png",
  "./CityEnviroinmentPack2/Outdoor_Table/Umbrella_Metallic.png",
  "./CityEnviroinmentPack2/Outdoor_Table/Umbrella_Height.png",
  // add all remaining texture paths from your list here...
];

// Load textures
textureFiles.forEach(path => {
    const name = path.split('/').pop().replace(/\.[^/.]+$/, "");
    Assets.textures[name] = textureLoader.load(path);
});

// ------------------- MODELS -------------------
const fbxFiles = [
  "./CityEnviroinmentPack2/Parking_Meter/PlasticTrashBin.fbx",
  "./CityEnviroinmentPack2/Realistic Electrical Box/RealisticElectricalBox.fbx",
  "./CityEnviroinmentPack2/Outdoor_Table/Outdoor_Table.fbx",
  "./CityEnviroinmentPack2/Mailbox/Mailbox.fbx",
  "./CityEnviroinmentPack2/Bus_Stop/Bus_Stop.fbx",
  "./CityEnviroinmentPack2/Portaloo/Portaloo.fbx",
  "./CityEnviroinmentPack2/Roadblock02/Roadblock02.fbx",
  "./CityEnviroinmentPack2/Plastic_Trash_Bin/PlasticTrashBin.fbx",
  "./CityEnviroinmentPack2/Outdoor_Chair/Outdoor_Chair.fbx",
  "./CityEnvPack1/SecurityCamera/SecurityCamera.obj",
  "./CityEnvPack1/CityMailBox/CityMailBox.fbx",
  "./CityEnvPack1/ATM/ATM.fbx",
  "./CityEnvPack1/StreetLight/StreetLight.obj",
  "./CityEnvPack1/Rooftop_Watertower/Rooftop_Watertower.fbx",
  "./CityEnvPack1/Dumpster/Dumpster.fbx",
  "./CityEnvPack1/AC_Unit_OutDoor/AC_Unit_Outdoor.fbx",
  "./CityEnvPack1/StreetBench/StreetBench.fbx",
  "./CityEnvPack1/Traffic_Cone/Traffic_Cone.fbx",
  "./CityEnvPack1/Payphone/Payphone.fbx",
  "./CityEnvPack1/ConcreteRoadblock/RoadBlock.fbx",
  "./Universal Base Characters[Standard]/Base Characters/Unity/Superhero_Male_FullBody.fbx",
  "./Universal Base Characters[Standard]/Base Characters/Unity/Superhero_Female_FullBody.fbx",
  // add all remaining FBX paths from your list here...
];

fbxFiles.forEach(path => {
    const name = path.split('/').pop().replace(/\.[^/.]+$/, "");
    fbxLoader.load(path, object => {
        Assets.models[name] = object;
    });
});

const gltfFiles = [
  "./Universal Base Characters[Standard]/Base Characters/Godot - UE/Superhero_Female_FullBody.gltf",
  "./Universal Base Characters[Standard]/Base Characters/Godot - UE/Superhero_Male_FullBody.gltf",
  "./Universal Base Characters[Standard]/Hairstyles/Origin at 0/glTF (Godot)/Eyebrows_Regular.gltf",
  "./Universal Base Characters[Standard]/Hairstyles/Origin at 0/glTF (Godot)/Hair_BuzzedFemale.gltf",
  "./Universal Base Characters[Standard]/Hairstyles/Origin at 0/glTF (Godot)/Hair_Long.gltf",
  "./Universal Base Characters[Standard]/Hairstyles/Origin at 0/glTF (Godot)/Hair_SimpleParted.gltf",
  "./Universal Base Characters[Standard]/Hairstyles/Origin at 0/glTF (Godot)/Eyebrows_Female.gltf",
  "./Universal Base Characters[Standard]/Hairstyles/Origin at 0/glTF (Godot)/Hair_Buns.gltf",
  "./Universal Base Characters[Standard]/Hairstyles/Origin at 0/glTF (Godot)/Hair_Beard.gltf",
  "./Universal Base Characters[Standard]/Hairstyles/Origin at 0/glTF (Godot)/Hair_Buzzed.gltf",
  "./Universal Base Characters[Standard]/Hairstyles/Origin at 0/glTF (Godot)/Hair_SimpleParted.gltf",
  // add all remaining GLTF paths...
];

gltfFiles.forEach(path => {
    const name = path.split('/').pop().replace(/\.[^/.]+$/, "");
    gltfLoader.load(path, gltf => {
        Assets.models[name] = gltf.scene;
    });
});

// ------------------- SOUNDS -------------------
const soundFiles = [
  "./sfx_100_v2/sfx100v2_metal_05.ogg",
  "./sfx_100_v2/sfx100v2_metal_04.ogg",
  "./sfx_100_v2/sfx100v2_loop_water_03.ogg",
  "./sfx_100_v2/sfx100v2_loop_water_02.ogg",
  "./sfx_100_v2/sfx100v2_metal_02.ogg",
  "./sfx_100_v2/sfx100v2_loop_construction_site.ogg",
  "./sfx_100_v2/sfx100v2_loop_water_01.ogg",
  "./sfx_100_v2/sfx100v2_metal_01.ogg",
  "./sfx_100_v2/sfx100v2_footstep_wet_02.ogg",
  "./sfx_100_v2/sfx100v2_footstep_wood_03.ogg",
  "./sfx_100_v2/sfx100v2_misc_24.ogg",
  // add all remaining .ogg sound paths...
];

soundFiles.forEach(path => {
    const name = path.split('/').pop().replace(/\.[^/.]+$/, "");
    const sound = new THREE.Audio(listener);
    audioLoader.load(path, buffer => {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(1);
    });
    Assets.sounds[name] = sound;
});