function BFS2(graph, start)
{
	// Breadth First Search
	
	
	//graph.cloneAdjMatrix
	
	let q = new Queue();
	let visited = new Array(graph.nodeCount);
	let i, node;
	
	q.enqueue(start);
	visited[start] = 1;
	
	console.log(graph.cloneAdjMatrix);
	console.log(graph.adjMatrix);
	console.log(q);

	
	while (!q.isEmpty())
	{
		node = q.dequeue();
		requestAnimationFrame(function(timestamp){graph.nodes[node].material.color.setHex(0x43ff0a);
		render();});
		
		console.log("Node " + node);
		
		//animBFS(graph, visited, q, node, 0);
		for (i = 0; i < graph.nodeCount; i++){
			if (graph.cloneAdjMatrix[node][i] && !visited[i])
			{
				console.log("We entered into the if");
				visited[i] = 1;
				q.enqueue(i);
				//console.log("Is the animation queeu working " + q.isEmpty());
				//animate2(i);
				
					
				
			}
		}
		console.log("is q actually empty ? " + q.isEmpty());
	}
}


function animBFS(graph, visited, q, node, i)
{
	console.log("This is fucking i you stupid fucking igit" + i);
	i++; 
	
	if (i == graph.nodeCount)
	{	
		console.log("returned out of the animBFS function");
		return;
	}
	
	if (graph.cloneAdjMatrix[node][i] && !visited[i])
	{
		visited[i] = true;
		q.enqueue(i);
		console.log(q);
		//console.log("Is the animation queeu working " + q.isEmpty());
		//animate2(i);
		//graph.nodes[node].material.color.setHex(0x43ff0a);
			
		
	}
	
	render();
	requestAnimationFrame(function(timestamp){animBFS(graph, visited, q, node, i)});
}


function BFS(graph, q, visited, node)
{	
	if (q.isEmpty())
	{
		console.log("We exited the BFS animate");
		return;
	}
	
	node = q.dequeue();
	graph.nodes[node].material.color.setHex(0x43ff0a);
	console.log("This is the node " + node);
	
	//if (count1 == graph.nodeCount)
		//count1 = 0;
	
	
	
	//console.log("THIS IS THE FUCKING COUNT " + count1);
	
	for (i = 0; i < graph.nodeCount; i++)
	{
		if (graph.cloneAdjMatrix[node][i] && !visited[i])
		{
			visited[i] = 1; 
			
			q.enqueue(i);
			console.log("Q has benn added");
			
			
		}
	}
	
	//count1++;
	
	
	render();
	requestAnimationFrame(function(timestamp) {
		BFS(graph, q, visited, node);
	});
}