class Graph
{
	
	constructor(nodeCount)
	{
		this.nodeCount = nodeCount;
		this.nodes = this.generateNodes(nodeCount);
		this.adjMatrix = this.generateAdjMatrix(this.nodes, nodeCount);
		this.linkMap = this.initLinks(this.adjMatrix, nodeCount, this.nodes);
		//this.animate();
		//this.count = 0;
		//this.ead84(nodeCount, this.nodes, this.nodeLink);
		
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
	
	generateAdjMatrix(node, nodeCount)
	{
		let links = new Array(nodeCount);
		let i, j, unconnected = 0;
	
		
		for (i = 0; i < nodeCount; i++)
		{
			links[i] = new Array(nodeCount);
			
			for (j = 0; j < nodeCount; j++)
			{
				// Don't want self cycles
				if (i == j)
				{
					links[i][j] = 0;
					continue;
				}
				
				links[i][j] = Math.round(Math.random());
			}
		}
		
		for (i = 0; i < nodeCount; i++)
		{
			for (j = 0; j < nodeCount; j++)
			{
				if (links[i][j] == 0)
					unconnected++;
				
				
				if (unconnected == nodeCount)
					links[i][j] = 1;	
				
				links[j][i] = links[i][j];
				
				

			}
			
			unconnected = 0;
		}
		
		return links;
	}
	
	initLinks(adjMatrix, nodeCount, nodes)
	{
		let i, j;
		let linkMap = new Map();
		
		for (i = 0; i < nodeCount; i++)
		{	
			for (j = 0; j < nodeCount; j++)
			{
				if (adjMatrix[i][j] == 1)
				{
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
		
		return linkMap;
	}
	
	
	
	ead84(nodeCount, nodes, links)
	{
		let  c1 = 2, c2 = 1, c3 = (9 * 10000), c4 = 0.1, d;
		let i, row, col, force = 0; 
		
		// This loop renders original positions spheres to see the change
		/*for (i = 0; i < nodeCount; i++)
		{
			var geometry = new THREE.SphereBufferGeometry( 5, 10, 10 );
			var material = new THREE.MeshBasicMaterial( {color: 0xff5757} );
			var sphere = new THREE.Mesh( geometry, material );
			sphere.position.x = nodes[i].position.x;
			sphere.position.y = nodes[i].position.y;
			sphere.position.z = nodes[i].position.z;
			
			scene.add(sphere);
			render();
		}*/
		
		//for (i = 0; i < 70; i++)
		//{
			for (row = 0; row < nodeCount; row++)
			{	
				for (col = 0; col < nodeCount; col++)
				{
					force = 0;
					
					if (row == col)
					{
						console.log("we continued");
						continue;
					}
					
					let nodeA = nodes[row].position;
					let nodeB = nodes[col].position;
					
					d = Math.abs(nodeA.distanceTo(nodeB));
					
					console.log("distance" + " is " + d);
					
					// Repulsive force
					if (links[row][col] == 0)
					{
						force = c4 * (c3 / (d * d));
						
						console.log("Repulsive Force " + force);
				
						let translateVector = new THREE.Vector3(0, 0, 0);
						translateVector.setX(nodes[row].position.x - nodes[col].position.x);
						translateVector.setY(nodes[row].position.y - nodes[col].position.y);
						translateVector.setZ(nodes[row].position.z - nodes[col].position.z);
						
	
						console.log("Translate Vector " + translateVector.x + " " + translateVector.y + " " + translateVector.z);
						console.log("translate normalized vec " + translateVector.normalize().length());
						console.log("Col Point/Vec " + nodes[col].position.x + " " + nodes[col].position.y + " " + nodes[col].position.z);
						console.log("Row Point/Vec " + nodes[row].position.x + " " + nodes[row].position.y + " " + nodes[row].position.z);
						console.log("distance vec" + " is " + d);
						
						
						nodes[row].translateOnAxis(translateVector.normalize(), force);
					}

					// Attractive force
					else
					{
						force = c4 * (c1 * Math.log(d / c2));
						
						console.log("Attractive Force " + force);
						
						let translateVector = new THREE.Vector3(0, 0, 0);
						translateVector.setX(nodes[col].position.x - nodes[row].position.x);
						translateVector.setY(nodes[col].position.y - nodes[row].position.y);
						translateVector.setZ(nodes[col].position.z - nodes[row].position.z);

						nodes[row].translateOnAxis(translateVector.normalize(), force);
					}
					
					//console.log("log " + (Math.log(d / c2)));
					//console.log("inverse " + (c3 / (d * d)));
				}
			}
		//}	
	}
}
	
	