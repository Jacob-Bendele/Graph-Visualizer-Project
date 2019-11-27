init();


let g1 = new Graph(20);
console.log(g1.nodeLink);

// Adds green origin point for reference
var spgeom = new THREE.SphereBufferGeometry( 5, 10, 10 );
var spmaterial = new THREE.MeshBasicMaterial( {color: 0x6beb34} );
var sphere = new THREE.Mesh( spgeom, spmaterial );

sphere.position.x = 0;
sphere.position.y = 0;
sphere.position.z = 0;

scene.add( sphere );

animate(g1);
console.log("Adjaceny matrix " + g1.nodeLink);
//render();




// Adds green origin point for reference
/*var spgeom = new THREE.SphereBufferGeometry( 5, 10, 10 );
var spmaterial = new THREE.MeshBasicMaterial( {color: 0x6ceb34} );
var sphere = new THREE.Mesh( spgeom, spmaterial );

sphere.position.x = -40;
sphere.position.y = -40;
sphere.position.z = -40;


scene.add( sphere );



render();


var norm = new THREE.Vector3(1, 1, 1);
console.log("norm vector " + norm.length());
console.log("norm vector normalizes " + norm.normalize().length());
sphere.translateOnAxis(norm.normalize(), 20);*/

