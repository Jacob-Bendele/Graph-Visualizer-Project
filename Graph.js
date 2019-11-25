class Graph
{
	constructor(nodeCount)
	{
		this.nodeCount = nodeCount;
		this.nodes = this.generateNodes(nodeCount);
		this.nodeLink = this.generateLinks(this.nodes, nodeCount);
	}
	
	generateNodes(nodeCount)
	{
		let points = new Array(nodeCount);
		let i;
		let max = new THREE.Vector3(0, 0, 0);
		let min = new THREE.Vector3(100, 100, 100);
		
		for (i = 0; i < nodeCount; i++)
		{	
		
			let posx = Math.floor(Math.random() * 101);
			let posy = Math.floor(Math.random() * 101);
			let posz = Math.floor(Math.random() * 101);
			
			min.x = Math.min(posx, min.x);
			min.y = Math.min(posy, min.y);
			min.z = Math.min(posz, min.z);
			
			max.x = Math.max(posx, max.x);
			max.y = Math.max(posy, max.y);
			max.z = Math.max(posz, max.z);
			
			var geometry = new THREE.SphereBufferGeometry( 5, 10, 10 );
			var material = new THREE.MeshBasicMaterial( {color: 0xff5757} );
			var sphere = new THREE.Mesh( geometry, material );
			
			sphere.position.x = posx;
			sphere.position.y = posy;
			sphere.position.z = posz;
			
			points[i] = sphere;
			
			scene.add( sphere );
		}
		
		camera.up = new THREE.Vector3(0,11,0);
		console.log(max.sub(min).multiplyScalar(0.5));
		//camera.lookAt((max.sub(min).multiplyScalar(0.5)));
		cameraControls.target = ((max.sub(min).multiplyScalar(0.5)));
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
				}
			}
		}
		
		return links;
		
	}
}