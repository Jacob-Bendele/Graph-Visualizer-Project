init();
render();

let g1 = new Graph(10);
console.log(g1.nodeLink);

			var spgeom = new THREE.SphereBufferGeometry( 5, 10, 10 );
			var spmaterial = new THREE.MeshBasicMaterial( {color: 0x6beb34} );
			var sphere = new THREE.Mesh( spgeom, spmaterial );
			
			sphere.position.x = 0;
			sphere.position.y = 0;
			sphere.position.z = 0;
			
			
			scene.add( sphere );

render();