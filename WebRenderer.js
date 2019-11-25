// Name: Jacob Bendele NID: Ja644123
// Course: CAP4720 Fall 2019
// Assignment: Assignment #3

"use strict";

// new globals
let group = new THREE.Group();

// Global Variables
let scene, camera, renderer, cameraControls;
let fillLight, keyLight, backLight;
let geometry = new THREE.Object3D();
let objectDiameter;
let points = new Array(40);

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

// Initialize everything the Renderer needs and render.
//init();
//render();

function init()
{
	// Create a new THREE.js scene and initialize Renderer, Scene, and Handlers.
	scene = new THREE.Scene();
	initRenderer();
	initScene();
	eventHandlers();
	initGUI();
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
	// Initializes everything a scene needs; Camera, Geometry, and Lights.
	initCamera();
	//initGeometry();
	initLight();
}

function initCamera()
{
	// Create instance of camera with 50fov, window aspect ration, and near/far distances.
	camera = new THREE.PerspectiveCamera(50, WIDTH/HEIGHT, 1, 100000);
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.z = 1000;
}

// Currently Unused function 
function initGeometry()
{
	let i;
	for (i = 0; i <20; i++)
	{	

		let posx = Math.floor(Math.random() * 101);
		let posy = Math.floor(Math.random() * 101);
		let posz = Math.floor(Math.random() * 101);
		
		var geometry = new THREE.SphereBufferGeometry( 5, 10, 10 );
		var material = new THREE.MeshBasicMaterial( {color: 0xff5757} );
		var sphere = new THREE.Mesh( geometry, material );
		
		sphere.position.x = posx;
		sphere.position.y = posy;
		sphere.position.z = posz;
		
		points[i] = sphere;
		
		scene.add( sphere );


	}
}

// Three directional lights are instantiated, position set, and added to the scene.
function initLight()
{
	keyLight = new THREE.DirectionalLight(0xFFBF80, 1.0);
	fillLight = new THREE.DirectionalLight(0xFFBF80, 1.0);
	backLight = new THREE.DirectionalLight(0xFFBF80, 1.0);
	
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

function initGUI()
{	
	// Creates instance of dat.GUI
	let guiController = new dat.GUI();

	// Creates folders in the dat.GUI
	let keyLightFolder = guiController.addFolder("Key Light");
	let fillLightFolder = guiController.addFolder("Fill Light");
	let backLightFolder = guiController.addFolder("Back Light");
	let scale = guiController.addFolder("Scale");
	let rotation = guiController.addFolder("Rotation");
	let translation = guiController.addFolder("Translation");
	
	// Creates GUIobject
	let guiObject = {
		
		KEY : {
			visKey : true, 
			intensKey : keyLight.intensity, 
			colorKey : "#" + keyLight.color.getHexString()
		},
		
		FILL : {
			visFill : true, 
			intensFill : fillLight.intensity, 
			colorFill : "#" + fillLight.color.getHexString()
		},
		
		BACK : {
			visBack : true, 
			intensBack : backLight.intensity,
			colorBack : "#" + backLight.color.getHexString()
		},
		
		scale : geometry.scale.x,
		rotation : 0,
		
		TRANSLATE : {
			x : 0,
			y : 0,
			z : 0
		}
		
	};
	
	// Adds property to GUI for scaling the rendered object
	scale.add(guiObject, "scale")
	.name("Object Scale")
	.min(0.1).max(2).step(0.1)
	.onChange(
		function(val)
		{
			geometry.scale.setScalar(val);
			
			// Upon rescaling of the object; recompute the length (diameter) of it using a bounding box
			let bBox = new THREE.Box3().setFromObject(geometry);
			let size = new THREE.Vector3();
			bBox.getSize(size);
			
			objectDiameter = size.length();
			console.log(objectDiameter);
			
			render();
		}
	);
	
	// Adds property to GUI for roating the rendered object
	rotation.add(guiObject, "rotation")
	.name("Object Rotation")
	.min(0).max(360).step(1)
	.onChange(
		function(deg)
		{	
			geometry.rotation.set(0, (deg * (Math.PI / 180)), 0);
			render();
		}
	);
	
	// Adds property to GUI for translating the rendered object along x, y, and z axes.
	translation.add(guiObject.TRANSLATE, "x")
	.name("Translation X")
	.min(-2).max(2).step(1)
	.onChange(
		function(distX)
		{
			geometry.position.set(distX * objectDiameter, geometry.position.y, geometry.position.z);
			render();
		}
	);
	
	translation.add(guiObject.TRANSLATE, "y")
	.name("Translation Y")
	.min(-2).max(2).step(1)
	.onChange(
		function(distY)
		{	
			geometry.position.set(geometry.position.x, distY * objectDiameter, geometry.position.z);
			render();
		}
	);
	
	translation.add(guiObject.TRANSLATE, "z")
	.name("Translation Z")
	.min(-2).max(2).step(1)
	.onChange(
		function(distZ)
		{	
			geometry.position.set(geometry.position.x, geometry.position.y, distZ * objectDiameter);
			render();
		}
	);
	
	
	// Adds properties to GUI for Key Light
	keyLightFolder.add(guiObject.KEY, "visKey")
	.name("Key Light On/Off")
	.onChange(
		function(flag)
		{
			keyLight.visible = flag;
			render();
		}
	);
	
	keyLightFolder.add(guiObject.KEY, "intensKey")
	.min(0).max(1).step(0.1)
	.name("Key Intensity")
	.onChange(
		function(val)
		{
			keyLight.intensity = val;
			render();
		}
	);
	
	keyLightFolder.addColor(guiObject.KEY, "colorKey")
	.name("Key Color")
	.onChange(
		function(hexstring)
		{
			keyLight.color.set(hexstring)
			render();
		}
	);
	
	// Adds properties to GUI for Fill Light
	fillLightFolder.add(guiObject.FILL, "visFill")
	.name("Fill Light On/Off")
	.onChange(
		function(flag)
		{
			fillLight.visible = flag;
			render();
		}
	);

	fillLightFolder.add(guiObject.FILL, "intensFill")
	.min(0).max(1).step(0.1)
	.name("Fill Intensity")
	.onChange(
		function(val)
		{
			fillLight.intensity = val;
			render();
		}
	);
	
	fillLightFolder.addColor(guiObject.FILL, "colorFill")
	.name("Fill Color")
	.onChange(
		function(hexstring)
		{
			fillLight.color.set(hexstring)
			render();
		}
	);

	// Adds properties to GUI for Back Light
	backLightFolder.add(guiObject.BACK, "visBack")
	.name("Back Light On/Off")
	.onChange(
		function(flag)
		{
			backLight.visible = flag;
			render();
		}
	);
	
	backLightFolder.add(guiObject.BACK, "intensBack")
	.min(0).max(1).step(0.1)
	.name("Back Intensity")
	.onChange(
		function(val)
		{
			backLight.intensity = val;
			render();
		}
	);
	
	backLightFolder.addColor(guiObject.BACK, "colorBack")
	.name("Back Color")
	.onChange(
		function(hexstring)
		{
			backLight.color.set(hexstring)
			render();
		}
	);	
}

function render()
{
	renderer.render(scene, camera);
}