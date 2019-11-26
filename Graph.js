class Graph
{
	
	constructor(nodeCount)
	{
		this.nodeCount = nodeCount;
		this.nodes = this.generateNodes(nodeCount);
		this.nodeLink = this.generateLinks(this.nodes, nodeCount);
		//this.animate();
		//this.count = 0;
		//this.ead84(nodeCount, this.nodes, this.nodeLink);
		
	}
	
	generateNodes(nodeCount)
	{
		let points = new Array(nodeCount);
		let i;
		let center = new THREE.Vector3(0, 0, 0);
		let min = new THREE.Vector3(100, 100, 100);
		
		for (i = 0; i < nodeCount; i++)
		{	
		
			let posx = Math.floor(Math.random() * 101);
			let posy = Math.floor(Math.random() * 101);
			let posz = Math.floor(Math.random() * 101);
			
			//min.x = Math.min(posx, min.x);
			//min.y = Math.min(posy, min.y);
			//min.z = Math.min(posz, min.z);
			
			//max.x = Math.max(posx, max.x);
			//max.y = Math.max(posy, max.y);
			//max.z = Math.max(posz, max.z);
			
			
			
			var geometry = new THREE.SphereBufferGeometry( 5, 10, 10 );
			var material = new THREE.MeshBasicMaterial( {color: 0xff5757} );
			var sphere = new THREE.Mesh( geometry, material );
			
			sphere.position.x = posx;
			sphere.position.y = posy;
			sphere.position.z = posz;
			
			center.add(sphere.position);
			
			points[i] = sphere;
			
			
			scene.add(sphere);
		}
		
		center.multiplyScalar(1/nodeCount);
		cameraControls.target = (center);
		cameraControls.update();
		
		return points;
	}
	
	generateLinks(node, nodeCount)
	{
		let links = new Array(nodeCount);
		let i, j;
	
		
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
				links[j][i] = links[i][j];
				
				if (links[i][j] == 1)
				{
					var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
					var geometry = new THREE.Geometry();
					geometry.vertices.push(new THREE.Vector3( node[i].position.x, node[i].position.y, node[i].position.z) );
					geometry.vertices.push(new THREE.Vector3( node[j].position.x, node[j].position.y, node[j].position.z) );
					//geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
					var line = new THREE.Line( geometry, material );
					scene.add( line );
					console.log("This is the one you rare looking for " + node[i].position.x);
				}
			}
		}
		
		return links;
	}
	
	
	
	
	ead84(nodeCount, nodes, links)
	{
		let  c1 = 2, c2 = 1, c3 = 1, c4 = 0.1, d;
		let i, row, col, force = 0; 
		
		//for (i = 0; i < 100; i++)
		//{
			for (row = 0; row < nodeCount; row++)
			{	
				for (col = 0; col < nodeCount; col++)
				{
					if (row == col)
					{
						console.log("we continued");
						continue;
					}
					let nodeA = nodes[row].position;
					let nodeB = nodes[col].position;
					
					d = Math.abs(nodeA.distanceTo(nodeB));
					
					console.log("distance" + " is " + d);
					
					if (links[row][col] == 0)
					{
						force += c4 * (c3 / (d * d));
						//nodes[row].position.multiplyScalar(c4 * force);
						//console.log("This is repulsive force " + c4 * (c3 / (d * d)));
					}
					
					else
					{
						force -= c4 * (c1 * Math.log(d / c2));
						//console.log("This is the force for attraction" + force);
						//console.log("This is attractive force" + c4 * (c1 * Math.log(d / c2)));
					}
					
					console.log("log " + (Math.log(d / c2)));
					console.log("inverse " + (c3 / (d * d)));
				}
				nodes[row].position.addScalar(force);
				console.log("TOTAL FORCE FOR " + row + " is " + force);
				force = 0;
			}
			
		//}	
	}
}
	
	