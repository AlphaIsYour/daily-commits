import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import TWEEN from "https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js";

let canvasform = document.getElementById("dCanvas");
let width = canvasform.offsetWidth;
let height = canvasform.offsetHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
let mouseX = width / 2;
let mouseY = height / 2;
let object;
let controls;
const loader = new GLTFLoader();
loader.load(`model/free_porsche_911_carrera_4s.glb`, function (gltf) {
  object = gltf.scene;
  scene.add(object);
});

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);

document.getElementById("dCanvas").appendChild(renderer.domElement);
camera.position.set(5, 0, 1);

let ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);
let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);
let light = new THREE.PointLight(0xc4c4c4, 10);
light.position.set(0, 300, 500);
scene.add(light);
let light2 = new THREE.PointLight(0xc4c4c4, 10);
light2.position.set(500, 100, 0);
scene.add(light2);
let light3 = new THREE.PointLight(0xc4c4c4, 10);
light3.position.set(0, 100, -500);
scene.add(light3);
let light4 = new THREE.PointLight(0xc4c4c4, 10);
light4.position.set(-500, 300, 500);
scene.add(light4);

controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
}
animate();

window.addEventListener("resize", function () {
  width = canvasform.offsetWidth;
  height = canvasform.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

let btnshowmore = document.getElementById("showmore");
let slider = document.querySelector(".slider");

function runCamera(x, y, z) {
  const targetPosition = new THREE.Vector3(x, y, z);
  const duration = 1200;

  const tween = new TWEEN.Tween(camera.position)
    .to(targetPosition, duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    })
    .start();
}
let statusContent = "contentOne";
btnshowmore.onclick = () => {
  slider.classList.remove("contentOneAction");
  slider.classList.remove("contentTwoAction");
  switch (statusContent) {
    case "contentOne":
      runCamera(3, 0, 1);
      statusContent = "contentTwo";
      slider.classList.add("contentTwoAction");
      break;
    case "contentTwo":
      runCamera(2, 3, 1);
      statusContent = "fullScreen";
      break;
    case "fullScreen":
      runCamera(5, 0, 1);
      slider.classList.add("contentOneAction");
      statusContent = "contentOne";
      break;

    default:
      break;
  }
};
