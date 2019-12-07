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
	//initGUI();
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

function initGUI(graph)
{	
	// Creates instance of dat.GUI
	let guiController = new dat.GUI();

	// Creates folders in the dat.GUI
	let pathTraversal = guiController.addFolder("Path Traversal Alogrithms");
	let shortestPath = guiController.addFolder("Shortest Path Algorithms");
	let nodes = guiController.addFolder("Nodes");

	
	// Creates GUIobject
	let guiObject = {
		
		NODES : graph.nodeCount,
		
		PATHFINDING : {
			BFS : false, 
			DFS : false
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
	nodes.add(guiObject, "NODES")
	.name("# of Nodes")
	.min(1).max(15).step(1)
	.onChange(
		function(val)
		{
			
			clearScene();
			count = 0;
			let graph = new Graph(val);
			animate(graph);
			
			//initGUI(graph);
			
			// Upon rescaling of the object; recompute the length (diameter) of it using a bounding box
			//let bBox = new THREE.Box3().setFromObject(geometry);
			//let size = new THREE.Vector3();
			//bBox.getSize(size);
			
			//objectDiameter = size.length();
			//console.log(objectDiameter);
			
			//render();
		}
	);
	
	
	// Adds property to GUI for translating the rendered object along x, y, and z axes.
	pathTraversal.add(guiObject.PATHFINDING, "BFS")
	.name("BFS")
	.onChange(
		function()
		{
			// Run Bfs function
		}
	);
	
	pathTraversal.add(guiObject.PATHFINDING, "DFS")
	.name("DFS")
	.onChange(
		function()
		{
			// Run Bfs function
		}
	);
	

	
	
	// Adds properties to GUI for Key Light
	/*keyLightFolder.add(guiObject.KEY, "visKey")
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
	);*/
}

function render()
{
	renderer.render(scene, camera);
}