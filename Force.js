
function ead84(nodeCount, nodes, links)
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
	
let count = 0;
function animate(graph)
{
	render();
	console.log("This is the count " + count);
	if (count == 100)
	{	
		console.log("Returned out of animate");
		return;
	}
	
	ead84(graph.nodeCount, graph.nodes, graph.nodeLink);
	count++;
	
	requestAnimationFrame(animate);
}