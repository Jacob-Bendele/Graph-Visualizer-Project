// Jacob Bendele

// Graph class that takes care of random generation and 3D initalization of
// a undirected graph
class Graph
{
	
	constructor(nodeCount)
	{
		this.nodeCount = nodeCount;
		this.nodes = this.generateNodes();
		this.adjMatrix = this.generateAdjMatrix();
		this.cloneAdjMatrix = this.copyAdjMatrix();
		this.linkMap = this.initLinks();
		//this.printAdjMatrix(this.nodeCount, this.adjMatrix)
	}
	
	// Randomly generates a number of nodes withint a 500 x 500 x 500 3D space
	generateNodes()
	{
		let nodes = new Array(this.nodeCount);
		let center = new THREE.Vector3(0, 0, 0);
		
		for (let i = 0; i < this.nodeCount; i++)
		{	
		
			let posx = Math.floor(Math.random() * 500);
			let posy = Math.floor(Math.random() * 500);
			let posz = Math.floor(Math.random() * 500);
				
			let geometry = new THREE.SphereBufferGeometry( 5, 10, 10 );
			let material = new THREE.MeshBasicMaterial( {color: 0xff5757} );
			let sphere = new THREE.Mesh( geometry, material );
			
			sphere.position.x = posx;
			sphere.position.y = posy;
			sphere.position.z = posz;
			
			// Vector addition to later be averaged to find center for camera
			center.add(sphere.position);
			
			nodes[i] = sphere;
			
			scene.add(sphere);
		}
		
		// Bascially center of mass calculation, but for camera look target
		center.multiplyScalar(1/this.nodeCount);
		cameraControls.target = (center);
		cameraControls.update();
		
		return nodes;
	}
	
	// Generates an adjacency matrix for our nodes
	generateAdjMatrix()
	{
		let links = new Array(this.nodeCount);
		let unconnected = 0;
		
		for (let i = 0; i < this.nodeCount; i++)
			links[i] = new Array(this.nodeCount);
		
		
		for (let i = this.nodeCount - 1; i >= 0; i--)
		{	
			for (let j = this.nodeCount - 1; j >= 0; j--)
			{
				if (i == j)
				{	
					links[i][j] = 0;
					continue;
				}
				
				// If i is less than 20 percent of our maximum nodes then
				// we can assign it more links.
				if (i < Math.round(this.nodeCount * 0.1))
				{
					let edge = Math.round(Math.random());
					
					links[i][j] = edge;
					links[j][i] = edge;
				}
				
				else
				{
					// Magic number, but represents a 10 percent chance
					if (Math.round(Math.random() * 9) == 4)
					{
						links[i][j] = 1;
						links[j][i] = 1;
					}
					
					// No link generated so fill with a zero
					else 
					{
						links[i][j] = 0;
						links[j][i] = 0;
					}
				}	
			}
		}
		
		// Loop through the adjacency matrix and find nodes without links
		for (let i = 0; i < this.nodeCount; i++)
		{	
			for (let j = 0; j < this.nodeCount; j++)
			{
				if (links[i][j] == 0)
				{
					unconnected++;
				}
				
				if (unconnected == this.nodeCount)
				{
					links[i][this.nodeCount - i - 1] = 1;
					links[this.nodeCount - i - 1][i] = 1;
				}
			}
			unconnected = 0;
		}
		return links;
	}
	
	// Creates a copy of the adjacency matrix since JS passes objects by reference
	copyAdjMatrix()
	{
		let cloneAdjMatrix = new Array(this.nodeCount);
		
		for (let i = 0; i < this.nodeCount; i++)
			cloneAdjMatrix[i] = new Array(this.nodeCount);
		
		for (let i = 0; i < this.nodeCount; i++)
		{
			for (let j = 0; j < this.nodeCount; j++)
			{
				cloneAdjMatrix[i][j] = this.adjMatrix[i][j];
			}
		}
		
		return cloneAdjMatrix;
	}
	
	
	// TODO: Change to "initEdges" and edgeMap: more instantly readable in the context of 
	// a graph.
	// Initializes the links in 3D space
	initLinks()
	{
		let linkMap = new Map();
		
		// Loop through the adjacency matrix
		for (let i = 0; i < this.nodeCount; i++)
		{	
			for (let j = 0; j < this.nodeCount; j++)
			{
				
				if (this.adjMatrix[i][j] == 1)
				{
					this.adjMatrix[j][i] = 0; // Keeps from drawing two links
					
					let material = new THREE.LineBasicMaterial( { color: 0x86c5da } );
					let geometry = new THREE.Geometry();
					
					geometry.vertices.push(new THREE.Vector3( this.nodes[i].position.x, this.nodes[i].position.y, this.nodes[i].position.z) );
					geometry.vertices.push(new THREE.Vector3( this.nodes[j].position.x, this.nodes[j].position.y, this.nodes[j].position.z) );

					let line = new THREE.Line( geometry, material );
					
					// Adds the link to a Hashmap for later reference
					let key = i * 10 + j;
					linkMap.set(key, line);
					
					scene.add( line );
				}
			}
		}
		return linkMap;
	}
	
	printAdjMatrix()
	{	
		for (let i = 0; i < this.nodeCount; i++)
			console.log(this.adjMatrix[i].toString());
	}
	
	centerCamera()
	{
		let center = new THREE.Vector3(0, 0, 0);
		
		for (let i = 0; i < this.nodeCount; i++)
		{
			center.add(this.nodes[i].position);
		}
		
		center.multiplyScalar(1/this.nodeCount);
		cameraControls.target = (center);
		cameraControls.update();
	}
}