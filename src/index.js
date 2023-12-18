import "./styles.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import img from "./assets/img/img.jpg";
import sunimg from "./assets/img/sunimg.jpeg";
import mercury from "./assets/img/mercury.jpeg";
import venus from "./assets/img/venus.jpeg";
import earth from "./assets/img/earth.jpeg";
import mars from "./assets/img/mars.jpeg";
import jupiter from "./assets/img/jupiter.jpeg";
import saturn from "./assets/img/saturn.jpeg";
import saturn_ring from "./assets/img/saturn_ring.png";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// THREE.StereoEffect = function(renderer) {};
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(img);

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunimg),
});

const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

function createPlanets(size, texture, position, ring) {
  const Geo = new THREE.SphereGeometry(size, 30, 30);
  const Mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const pla = new THREE.Mesh(Geo, Mat);
  const obj = new THREE.Object3D();
  obj.add(pla);
  scene.add(obj);
  pla.position.x = position;

  if (ring) {
    const RingGeo = new THREE.RingGeometry(ring.inner, ring.outer, 20, 32);
    const RingMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const Ring = new THREE.Mesh(RingGeo, RingMat);

    obj.add(Ring);
    Ring.position.x = position;
    Ring.rotation.x = 0.5 * Math.PI;
  }

  return { mesh: pla, obj };
}

const mer = createPlanets(3.2, sunimg, 28);
const ven = createPlanets(5, venus, 58);
const ear = createPlanets(5, earth, 78);
const mar = createPlanets(4.2, mars, 108);
const jup = createPlanets(10, jupiter, 158);
const sat = createPlanets(10, saturn, 258, {
  inner: 20,
  outer: 35,
  texture: saturn_ring,
});

function animate() {
  sun.rotateY(0.004);

  mer.mesh.rotateY(0.006);
  mer.obj.rotateY(0.16);

  ven.mesh.rotateY(0.006);
  ven.obj.rotateY(0.1);

  ear.mesh.rotateY(0.006);
  ear.obj.rotateY(0.08);

  mar.mesh.rotateY(0.006);
  mar.obj.rotateY(0.06);

  jup.mesh.rotateY(0.006);
  jup.obj.rotateY(0.05);

  sat.mesh.rotateY(0.008);
  sat.obj.rotateY(0.03);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = this.window.innerWidth / this.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, this.window.innerHeight);
});
