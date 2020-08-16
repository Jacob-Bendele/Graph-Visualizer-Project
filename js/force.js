// Jacob Bendele

// Basic force layout function "Eades"
function ead84(nodeCount, nodes, links)
{
	let  c1 = 2, c2 = 0.001, c3 = 100000, c4 = 0.1, d;
	let force = 0; 
	
	// This loop renders original positions spheres to see the change
	/*for (let i = 0; i < nodeCount; i++)
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

	// Loops over the adjacency matrix
	for (let row = 0; row < nodeCount; row++)
	{	
		for (let col = 0; col < nodeCount; col++)
		{
			force = 0;
			
			if (row == col)
			{
				continue;
			}
			
			// Finds distance between two nodes
			let nodeA = nodes[row].position;
			let nodeB = nodes[col].position;
			
			d = Math.abs(nodeA.distanceTo(nodeB));
			
			// If there is no link between nodes generate a repulsive force
			if (links[row][col] == 0)
			{
				force = c4 * (c3 / (d * d));
		
				let translateVector = new THREE.Vector3(0, 0, 0);
				translateVector.setX(nodes[row].position.x - nodes[col].position.x);
				translateVector.setY(nodes[row].position.y - nodes[col].position.y);
				translateVector.setZ(nodes[row].position.z - nodes[col].position.z);
				
				// Translate the node in the direction of the force
				nodes[row].translateOnAxis(translateVector.normalize(), force);
			}

			// If there is a link between nodes generate an attractive force
			else
			{
				force = c4 * (c1 * Math.log(d / c2));
				
				let translateVector = new THREE.Vector3(0, 0, 0);
				translateVector.setX(nodes[col].position.x - nodes[row].position.x);
				translateVector.setY(nodes[col].position.y - nodes[row].position.y);
				translateVector.setZ(nodes[col].position.z - nodes[row].position.z);

				// Translate the node in the direction of the force
				nodes[row].translateOnAxis(translateVector.normalize(), force);
			}
		}
	}
}
	
// Takes graph parameters and moves each link after a force is applied to a node
function updateLinks(linkMap, nodeCount, nodes, adjMatrix)
{
	for (let i = 0; i < nodeCount; i++)
	{	
		for (let j = 0; j < nodeCount; j++)
		{
			if (adjMatrix[i][j] == 1)
			{
				let key = i * 10 + j;

				let currentLink = linkMap.get(key);
				
				scene.remove(scene.getObjectById(currentLink.id));
				
				let material = new THREE.LineBasicMaterial( { color: 0x86c5da } );
				let geometry = new THREE.Geometry();
				
				geometry.vertices.push(new THREE.Vector3( nodes[i].position.x, nodes[i].position.y, nodes[i].position.z) );
				geometry.vertices.push(new THREE.Vector3( nodes[j].position.x, nodes[j].position.y, nodes[j].position.z) );
			
				let line = new THREE.Line( geometry, material );
				
				linkMap.delete(key);
				linkMap.set(key, line);
				
				scene.add( line );
			}
		}
	}
}

// Animation loop for the force direction
let count = 0;
function animate(graph)
{
	// Count is an imperical discovered magic number that the algorithm describes as coolness.
	// At some iteration the graph will settle; 100 is this coolness value.
	if (count == 100)
	{	
		return;
	}
	
	ead84(graph.nodeCount, graph.nodes, graph.adjMatrix);
	updateLinks(graph.linkMap, graph.nodeCount, graph.nodes, graph.adjMatrix); 
	
	count++;
	
	render();
	requestAnimationFrame(function(timestamp) {
		animate(graph);
	});
}