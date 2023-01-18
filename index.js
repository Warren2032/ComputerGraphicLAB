import * as THREE from "./three.js/build/three.module.js";
import { OrbitControls } from "./three.js/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./three.js/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from './three.js/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from './three.js/examples/jsm/geometries/TextGeometry.js';

let scene, camera1, camera2, renderer, control, currentCamera, anim = true, buttonMesh, textureLoader, mouse, pole1mesh, pole2mesh, model;

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

function createGround() {
  let geometry = new THREE.PlaneGeometry(1000,1000)
  let material = new THREE.MeshStandardMaterial({side: THREE.DoubleSide, color: "#8c3b0c"})
  let mesh = new THREE.Mesh(geometry, material)

  mesh.rotation.x = Math.PI/2
  mesh.position.set(0, -5, 0);
  mesh.castShadow = true;


  scene.add(mesh);
}


function render3DModel() {
  let loader = new GLTFLoader()
  loader.load('./assets/model/scene.gltf', function(gltf){
    model = gltf.scene
    model.scale.set(0.1,0.1,0.1)
    model.receiveShadow = true
    model.castShadow = true
    scene.add(model)
    
    return model
  })
}

function crate1() {
  let geometry = new THREE.BoxGeometry(10,10,10)
  let material = new THREE.MeshPhongMaterial({map: textureLoader.load("./assets/texture/crate1.jpeg")})
  let mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(-30,0,-40)
  mesh.rotation.y = Math.PI/1
  mesh.castShadow = true
  mesh.receiveShadow = true

  scene.add(mesh)
}

function crate2() {
  let geometry = new THREE.BoxGeometry(5,5,5)
  let material = new THREE.MeshPhongMaterial({map: textureLoader.load("./assets/texture/crate1.jpeg")})
  let mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(-30,-2,-48)
  mesh.rotation.x = Math.PI/6
  mesh.castShadow = true
  mesh.receiveShadow = true

  scene.add(mesh)
}

function crate3() {
  let geometry = new THREE.BoxGeometry(10,15,10)
  let material = new THREE.MeshPhongMaterial({map: textureLoader.load("./assets/texture/crate1.jpeg")})
  let mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(-40,2.5,30)
  mesh.rotation.y = -Math.PI/4
  mesh.castShadow = true
  mesh.receiveShadow = true

  scene.add(mesh)
}

function crate4() {
  let geometry = new THREE.BoxGeometry(20,20,20)
  let material = new THREE.MeshPhongMaterial({map: textureLoader.load("./assets/texture/crate2.jpeg")})
  let mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(30,5,40)
  mesh.rotation.y = Math.PI/3
  mesh.castShadow = true
  mesh.receiveShadow = true

  scene.add(mesh)
}

function crate5() {
  let geometry = new THREE.BoxGeometry(40,15,30)
  let material = new THREE.MeshPhongMaterial({map: textureLoader.load("./assets/texture/crate2.jpeg")})
  let mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(30,2.5,-60)
  mesh.rotation.y = -Math.PI/6
  mesh.castShadow = true
  mesh.receiveShadow = true

  scene.add(mesh)
}

function createTires1() {
  let geometry = new THREE.TorusGeometry(5,2.5,16,100)
  let material = new THREE.MeshStandardMaterial({color: "#3e444c"})
  let mesh = new THREE.Mesh(geometry,material)

  mesh.position.set(-70,-5,0)
  mesh.rotation.y = Math.PI/2
  mesh.castShadow = true
  mesh.receiveShadow = true

  scene.add(mesh)
}

function createTires2() {
  let geometry = new THREE.TorusGeometry(5,2.5,16,100)
  let material = new THREE.MeshStandardMaterial({color: "#3e444c"})
  let mesh = new THREE.Mesh(geometry,material)

  mesh.position.set(-65,-5,20)
  mesh.rotation.y = (Math.PI/2) + (Math.PI/9 * 1)
  mesh.castShadow = true
  mesh.receiveShadow = true

  scene.add(mesh)
}

function createTires3() {
  let geometry = new THREE.TorusGeometry(5,2.5,16,100)
  let material = new THREE.MeshStandardMaterial({color: "#3e444c"})
  let mesh = new THREE.Mesh(geometry,material)

  mesh.position.set(-65,-5,-20)
  mesh.rotation.y = -((Math.PI/2) + (Math.PI/9 * 1))
  mesh.castShadow = true
  mesh.receiveShadow = true

  scene.add(mesh)
}

function createTires4() {
  let geometry = new THREE.TorusGeometry(5,2.5,16,100)
  let material = new THREE.MeshStandardMaterial({color: "#3e444c"})
  let mesh = new THREE.Mesh(geometry,material)

  mesh.position.set(-55,-5,40)
  mesh.rotation.y = (Math.PI/2) + (Math.PI/9 * 2)
  mesh.castShadow = true
  mesh.receiveShadow = true

  scene.add(mesh)
}

function createTires5() {
  let geometry = new THREE.TorusGeometry(5,2.5,16,100)
  let material = new THREE.MeshStandardMaterial({color: "#3e444c"})
  let mesh = new THREE.Mesh(geometry,material)

  mesh.position.set(-55,-5,-40)
  mesh.rotation.y = -((Math.PI/2) + (Math.PI/9 * 2))
  mesh.castShadow = true
  mesh.receiveShadow = true

  scene.add(mesh)
}

function createPole1() {
  let geometry = new THREE.CylinderGeometry(1,1,50,16)
  let material = new THREE.MeshPhongMaterial({color: "#646FD4"})
  pole1mesh = new THREE.Mesh(geometry,material)

  pole1mesh.position.set(0,15,35)
  pole1mesh.rotation.x = -Math.PI/6
  pole1mesh.castShadow = true
  pole1mesh.receiveShadow = true

  scene.add(pole1mesh)
  return pole1mesh
}

function createPole2() {
  let geometry = new THREE.CylinderGeometry(1,1,50,16)
  let material = new THREE.MeshPhongMaterial({color: "#646FD4"})
  pole2mesh = new THREE.Mesh(geometry,material)

  pole2mesh.position.set(0,15,-35)
  pole2mesh.rotation.x = Math.PI/6
  pole2mesh.castShadow = true
  pole2mesh.receiveShadow = true

  scene.add(pole2mesh)
  return pole2mesh
}

function createButtonBox() {
  let geometry = new THREE.BoxGeometry(10,16.5,14.5)
  let material = new THREE.MeshPhongMaterial({color: "#848482"})
  let mesh = new THREE.Mesh(geometry,material)

  mesh.position.set(-43,3,65)
  mesh.rotation.y = -Math.PI/6
  mesh.castShadow = true
  mesh.receiveShadow = true

  scene.add(mesh)

}

function createButtonSphere() {
  let geometry = new THREE.SphereGeometry(4.5,32,16)
  let material = new THREE.MeshPhongMaterial({color: "#dc143c"})
  buttonMesh = new THREE.Mesh(geometry,material)

  buttonMesh.position.set(-46,3,63)
  buttonMesh.castShadow = true
  buttonMesh.receiveShadow = true

  scene.add(buttonMesh)
  return buttonMesh
}

function addListener() {
  document.addEventListener("click", mouseListener)
}

function createFont() {
  let loader = new FontLoader()
  loader.load('./three.js/examples/fonts/helvetiker_bold.typeface.json', function(font1){
    let geometry = new TextGeometry("Click Me!",{
      font:font1,
      color: "#990000",
      size:7,
      height:2
    })
    let material = new THREE.MeshPhongMaterial({color: "#FF5B00"})
    let mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(-35,30,50)
    mesh.rotation.y = Math.PI * 3 + 1
    mesh.castShadow = true
    mesh.receiveShadow = true

    scene.add(mesh)
  })
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
  textureLoader = new THREE.TextureLoader()
  control = new OrbitControls(camera2, renderer.domElement);

  initLight();
  // debugBox();
  skyBox();
  createGround();
  render3DModel();
  crate1();
  crate2();
  crate3();
  crate4();
  crate5();
  createTires1();
  createTires2();
  createTires3();
  createTires4();
  createTires5();
  createPole1();
  createPole2();
  createButtonBox();
  createButtonSphere();
  addListener();
  createFont();
}

let flag = false
let greenButton = false;
let greenButton1 = false;
let rotate = true;
function render() {
  renderer.render(scene, currentCamera);
  requestAnimationFrame(render);

  // control.update();
  if(anim){
    if(button1 && pole1mesh.rotation.x < 0){
      pole1mesh.rotation.x += 0.001;
      pole2mesh.rotation.x -= 0.001;
      if (pole1mesh.rotation.x > 0){
        flag =false;
        greenButton = true;
      }
    }
    if (greenButton1) {
      model.position.y += 0.1
  
      if (rotate){
        model.rotation.x += 0.001
        if (model.rotation.x > 0.3){
          rotate = false;
        }
      }
      else{
        model.rotation.x -= 0.001
        if (model.rotation.x < -0.3){
          rotate = true;
        }
      }
    }
  }
}

let button1 = false

function mouseListener() {
  flag = true
  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse,currentCamera)

  // rubah jadi cuma buttonnya yang bisa di klik

  var intersects = raycaster.intersectObject(buttonMesh)
  // const intersects = raycaster.intersectObjects(buttonMesh)
  if (intersects.length > 0) {
    flag = true
  }
  
  if (flag){
    intersects[0].object.material.color.set("#fada5e")
    button1 = true
  }
  

  if (greenButton) {
    intersects[0].object.material.color.set("#32dc32")
    greenButton1 = true;
  }
  
}


window.onload = function () {
  init();
  render();
  addEventListener("assets/model/scene.gltf");
};

window.onresize = function (){
  currentCamera.aspect = window.innerWidth/window.innerHeight;
  currentCamera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onmousemove = function(event) {
  mouse = new THREE.Vector2()

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)
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


      //this thing work?
      // cancelAnimationFrame(anim);
      anim = false;
    } else {
      currentCamera = camera1;
      anim = true;
    }
  }
}

