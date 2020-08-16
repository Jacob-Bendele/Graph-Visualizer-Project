// Jacob Bendele

"use strict";

// Global Variables
let scene, camera, renderer, cameraControls;

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

function init()
{
	// Create a new THREE.js scene and initialize Renderer, Scene, and Handlers.
	scene = new THREE.Scene();
	initRenderer();
	initScene();
	eventHandlers();
}

function initRenderer()
{
	// Create a new instance of a WebGLRenderer.
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(0x000000, 1);
	
	// Appends/adds the viewport for the renderer to the document body element.
	document.body.appendChild(renderer.domElement);
}

function initScene()
{
	// Initializes everything a scene needs; Camera and Lights.
	initCamera();
	initLight();
}

// Clears the scene of all rendered objects
function clearScene()
{
	while (scene.children.length > 0)
	{
		scene.remove(scene.children[0]);
	}
}

function initCamera()
{
	// Create instance of camera with 50fov, window aspect ration, and near/far distances.
	camera = new THREE.PerspectiveCamera(50, WIDTH/HEIGHT, 1, 100000);
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.z = 1000;
}

// Three directional lights are initialized, position set, and added to the scene.
function initLight()
{
	let keyLight = new THREE.DirectionalLight(0xFFBF80, 1.0);
	let fillLight = new THREE.DirectionalLight(0xFFBF80, 1.0);
	let backLight = new THREE.DirectionalLight(0xFFBF80, 1.0);
	
	keyLight.position.set(-1, 0.5, 1);
	fillLight.position.set(1, 0, 1);
	backLight.position.set(1, -0.5, -1);
	
	scene.add(keyLight);
	scene.add(fillLight);
	scene.add(backLight);
}

function eventHandlers()
{
	handleWindowResize();
	handleCameraChange();
}

// Handles resizing of the window.
function handleWindowResize()
{
	window.addEventListener(
		"resize", 
		function()
		{
			WIDTH = window.innerWidth;
			HEIGHT = window.innerHeight;
			renderer.setSize(WIDTH, HEIGHT);
			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();
			render();
		}
	);
}

// Handles camera changing position when using orbital controls.
function handleCameraChange()
{
	cameraControls.addEventListener("change",
		function()
		{
			camera.updateProjectionMatrix();
			render();
		}
	);
}

function render()
{
	renderer.render(scene, camera);
}