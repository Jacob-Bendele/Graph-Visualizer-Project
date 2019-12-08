class Graph
{
	
	constructor(nodeCount)
	{
		this.nodeCount = nodeCount;
		this.nodes = this.generateNodes(nodeCount);
		this.adjMatrix = this.generateAdjMatrix2(this.nodes, nodeCount);
		
		// This clone is currently necessary as the initilization of links
		// zeros out the [i][j] [j][i] pairs as to not render to links
		// for other computations it is necessary to have these present.
		this.cloneAdjMatrix = this.copyAdjMatrix(nodeCount, this.adjMatrix);
		//console.log(this.adjMatrix);
		this.linkMap = this.initLinks(this.adjMatrix, nodeCount, this.nodes);
		//console.log(this.adjMatrix);
		//this.animate();
		//this.count = 0;
		//this.ead84(nodeCount, this.nodes, this.nodeLink);
		this.printAdjMatrix(this.nodeCount, this.adjMatrix)
		
	}
	
	generateNodes(nodeCount)
	{
		let nodes = new Array(nodeCount);
		let i;
		let center = new THREE.Vector3(0, 0, 0);
		//let min = new THREE.Vector3(100, 100, 100);
		
		for (i = 0; i < nodeCount; i++)
		{	
		
			let posx = Math.floor(Math.random() * 500);
			let posy = Math.floor(Math.random() * 500);
			let posz = Math.floor(Math.random() * 500);
			
			
			//min.x = Math.min(posx, min.x);
			//min.y = Math.min(posy, min.y);
			//min.z = Math.min(posz, min.z);
			
			//max.x = Math.max(posx, max.x);
			//max.y = Math.max(posy, max.y);
			//max.z = Math.max(posz, max.z);
			
			
			
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
		
		center.multiplyScalar(1/nodeCount);
		cameraControls.target = (center);
		cameraControls.update();
		
		return nodes;
	}
	
	generateAdjMatrix2(node, nodeCount)
	{
		let links = new Array(nodeCount);
		let i, j, unconnected = 0;
		
		for (i = 0; i < nodeCount; i++)
			links[i] = new Array(nodeCount);
		
		
		for (i = nodeCount - 1; i >= 0; i--)
		{	
			for (j = nodeCount - 1; j >= 0; j--)
			{
				if (i == j)
				{	
					links[i][j] = 0;
					continue;
				}
				
				// If i is less than 20 percent of our maximum nodes then
				// we can assign it more links. Otherwise we dont
				// want 8 links per node etc.
				if (i < Math.round(nodeCount * 0.2))
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
		
		this.printAdjMatrix(nodeCount, links);
		
		for (i = 0; i < nodeCount; i++)
		{	
			for (j = 0; j < nodeCount; j++)
			{
				if (links[i][j] == 0)
				{
					unconnected++;
				}
				
				if (unconnected == nodeCount)
				{
					console.log("This is unconnected : " + unconnected);
					console.log(i);
					console.log(nodeCount - i - 1);
					links[i][nodeCount - i - 1] = 1;
					links[nodeCount - i - 1][i] = 1;
					
					//links[i][nodeCount - i - 2] = 1;
					//links[nodeCount - i - 2][i] = 1;
					console.log("ENCOUNTERED AN EMPTY LINK ROW 1 ");
					console.log(links[i][nodeCount - i - 1]);
					console.log(links[nodeCount - i - 1][i]);
				}
			}
			unconnected = 0;
		}

		this.printAdjMatrix(nodeCount, links);
		
		return links;
	}
	
	copyAdjMatrix(nodeCount, adjMatrix)
	{
		let i, j;
		let cloneAdjMatrix = new Array(nodeCount);
		
		for (i = 0; i < nodeCount; i++)
			cloneAdjMatrix[i] = new Array(nodeCount);
		
		for (i = 0; i < nodeCount; i++)
		{
			for (j = 0; j < nodeCount; j++)
			{
				cloneAdjMatrix[i][j] = adjMatrix[i][j];
			}
		}
		
		return cloneAdjMatrix;
	}
	
	
	// TODO: Change to "initEdges" and edgeMap: more instantly readable in the context of 
	// a graph.
	initLinks(adjMatrix, nodeCount, nodes)
	{
		let i, j;
		let linkMap = new Map();
		
		console.log("Init function");
		
		for (i = 0; i < nodeCount; i++)
		{	
			console.log(adjMatrix[i].toString());
			for (j = 0; j < nodeCount; j++)
			{
				
				if (adjMatrix[i][j] == 1)
				{
					adjMatrix[j][i] = 0; // Keeps from drawing two lines
					
					let material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
					let geometry = new THREE.Geometry();
					geometry.vertices.push(new THREE.Vector3( nodes[i].position.x, nodes[i].position.y, nodes[i].position.z) );
					geometry.vertices.push(new THREE.Vector3( nodes[j].position.x, nodes[j].position.y, nodes[j].position.z) );

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
	
	printAdjMatrix(nodeCount, adjMatrix)
	{
		let i;
		
		for (i = 0; i < nodeCount; i++)
			console.log(adjMatrix[i].toString());
	}
	
	randGen(nodeCount, curIteration)
	{
		if (curIteration <= Math.floor(nodeCount * 0.1))
			return 1;

		else
			return 9;
	}
}
	
	