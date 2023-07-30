import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

function renderModel(
    modelURL,
    ref
) {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth/window.innerHeight,
        0.01,
        1000
    );
    scene.background = new THREE.Color(0x000000);
    let canvas = document.getElementById(ref);
    var renderer = new THREE.WebGLRenderer(
        {
          antialias: true,
          canvas: canvas
        }
    );
    renderer.setPixelRatio( window.devicePixelRatio );
    const renderScene = new RenderPass( scene, camera );
    const params = {
        exposure: 0.5,
        bloomStrength: 2.5,
        bloomThreshold: 0.4,
        bloomRadius: 0.3
    };
	const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
	bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
	bloomPass.radius = params.bloomRadius;
    var composer = new EffectComposer( renderer );
	composer.addPass( renderScene );
	composer.addPass( bloomPass );
    var loader = new GLTFLoader();
    let doll;
    loader.load(
        modelURL,
        function(gltf){
          gltf.scene.scale.set( 1, 1, 1 );
          gltf.scene.position.x = 1;                   
          gltf.scene.position.y = 0;
          gltf.scene.position.z = 0;   
          gltf.scene.rotation.y = 1.57; 
          scene.add(gltf.scene);
          doll = gltf.scene.getObjectByName('Curve');
          doll.material.emissive = new THREE.Color(0xEA1573);
          doll.material.emissiveIntensity = 2;
          animate();
        }
    );
    camera.position.set(0,1,3.5);
    const animate = () => {
        composer.render();
        camera.rotation.z -= 0.02;
        requestAnimationFrame(animate);
    }
}

function main(){
    let modelURL = "https://angeldollface.art/doll-cdn/models/shinyDoll.glb";
    let canvasRef = "custom";
    renderModel(modelURL, canvasRef);
}

main();