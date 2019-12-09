class Graph
{
	
	constructor(nodeCount)
	{
		this.nodeCount = nodeCount;
		this.nodes = this.generateNodes();
		this.adjMatrix = this.generateAdjMatrix();
		
		// This clone is currently necessary as the initilization of links
		// zeros out the [i][j] [j][i] pairs as to not render to links
		// for other computations it is necessary to have these present.
		this.cloneAdjMatrix = this.copyAdjMatrix();
		this.linkMap = this.initLinks();
		//this.printAdjMatrix(this.nodeCount, this.adjMatrix)
		
	}
	
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
			
			center.add(sphere.position);
			
			nodes[i] = sphere;
			
			
			scene.add(sphere);
		}
		
		center.multiplyScalar(1/this.nodeCount);
		cameraControls.target = (center);
		cameraControls.update();
		
		return nodes;
	}
	
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
				// we can assign it more links. Otherwise we dont
				// want 8 links per node etc.
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
					
					// Not 1 so must be zero
					else 
					{
						links[i][j] = 0;
						links[j][i] = 0;
					}
				}	
			}
		}
		
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
					console.log("This is unconnected : " + unconnected);
					console.log(i);
					console.log(this.nodeCount - i - 1);
					links[i][this.nodeCount - i - 1] = 1;
					links[this.nodeCount - i - 1][i] = 1;
					
					//console.log("ENCOUNTERED AN EMPTY LINK ROW");
					//console.log(links[i][nodeCount - i - 1]);
					//console.log(links[nodeCount - i - 1][i]);
				}
			}
			unconnected = 0;
		}

		
		return links;
	}
	
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
	initLinks()
	{
		let linkMap = new Map();
		
		//console.log("Init function");
		
		for (let i = 0; i < this.nodeCount; i++)
		{	
			//console.log(adjMatrix[i].toString());
			for (let j = 0; j < this.nodeCount; j++)
			{
				
				if (this.adjMatrix[i][j] == 1)
				{
					this.adjMatrix[j][i] = 0; // Keeps from drawing two lines
					
					let material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
					let geometry = new THREE.Geometry();
					geometry.vertices.push(new THREE.Vector3( this.nodes[i].position.x, this.nodes[i].position.y, this.nodes[i].position.z) );
					geometry.vertices.push(new THREE.Vector3( this.nodes[j].position.x, this.nodes[j].position.y, this.nodes[j].position.z) );

					let line = new THREE.Line( geometry, material );
					
					let key = i * 10 + j;
					
					linkMap.set(key, line);
					
					scene.add( line );
				}
			}
		}
		console.log("After init zero");
		
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
	
	