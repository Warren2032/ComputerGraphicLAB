import * as THREE from "./three.js/build/three.module.js";
import { OrbitControls } from "./three.js/examples/jsm/controls/OrbitControls.js";

let scene, camera1, camera2, renderer, control, currentCamera, anim;

function skyBox(){
  let boxGeo = new THREE.BoxGeometry(1000,1000,1000);
  let loader = new THREE.TextureLoader();

  let right = loader.load('./assets/skybox/dawn_right.png');
  let left = loader.load('./assets/skybox/dawn_left.png');
  let top = loader.load('./assets/skybox/dawn_top.png');
  let bottom = loader.load('./assets/skybox/dawn_bottom.png');
  let front = loader.load('./assets/skybox/dawn_front.png');
  let back = loader.load('./assets/skybox/dawn_back.png');

  let boxMat = [
    new THREE.MeshBasicMaterial({
      map : right, side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
      map : left, side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
      map : top, side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
      map : bottom, side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
      map : front, side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
      map : back, side: THREE.BackSide
    })
  ]

  let boxMesh = new THREE.Mesh(boxGeo, boxMat);
  scene.add(boxMesh);
}

function debugBox() {
  let box = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshBasicMaterial({color:"#ff0000"}));

  box.position.set(0, 0, 0);
  box.castShadow = true;

  scene.add(box);
}

//lighting 1(ambient), 2,3,4 (spotlight)
function initLight(){
  createLight();
  createLight1();
  createLight2();
  createLight3();
}
function createLight() {
  let light = new THREE.AmbientLight("#404040");

  scene.add(light);
}
function createLight1() {
  let light = new THREE.SpotLight("#ffffff", 1, 300);
  light.position.set(-100, 0, 100);
  light.castShadow = true;
  
  light.target.position.set(0,50,0);
  light.target.updateMatrixWorld();

  scene.add(light);
}
function createLight2() {
  let light = new THREE.SpotLight("#ffffff", 1, 300);
  light.position.set(-100, 0, -100);
  light.castShadow = true;

  light.target.position.set(0,50,0);
  light.target.updateMatrixWorld();

  scene.add(light);
}
function createLight3() {
  let light = new THREE.SpotLight("#ffffff", 0.5, 300, Math.PI/4 + Math.PI/6);
  light.position.set(0, 200, 0);
  light.castShadow = true;

  scene.add(light);
}

function init() {
  scene = new THREE.Scene();

  //Camera 1
  camera1 = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera1.position.set(-180, 30, 0);
  camera1.lookAt(0, 30, 0);

  //Camera 2
  camera2 = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera2.position.set(-200, 50, 0);
  camera2.lookAt(0, 0, 0);

  currentCamera=camera1;

  renderer = new THREE.WebGLRenderer({ antialiasing: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  document.body.appendChild(renderer.domElement);
 // control = new OrbitControls(currentCamera, renderer.domElement);

  initLight();
  debugBox();
  skyBox();
}

function render() {
  //control.update();
  renderer.render(scene, currentCamera);
  anim = requestAnimationFrame(render);
}

window.onload = function () {
  init();
  render();
  addEventListener();
};

window.onresize = function (){
  currentCamera.aspect = window.innerWidth/window.innerHeight;
  currentCamera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function addEventListener() {
  document.addEventListener("keydown", keyboardListener);
}

function keyboardListener(e) {
  let keyCode = event.keyCode;
  //console.log(keyCode);
  if(keyCode == 32) {
    if (currentCamera == camera1) {
      currentCamera = camera2;
      control = new OrbitControls(currentCamera, renderer.domElement);

      //this thing work?
      // cancelAnimationFrame(anim);
    } else {
      currentCamera = camera1;
    }
  }
}