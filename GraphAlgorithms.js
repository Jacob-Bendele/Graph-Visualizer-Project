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

function BFS(graph, q, visited, node)
{	
	if (q.isEmpty())
	{
		console.log("We exited the BFS animate");
		return;
	}
	
	node = q.dequeue();
	graph.nodes[node].material.color.setHex(0x43ff0a);
	
	if (node == 0)
		graph.nodes[node].material.color.setHex(0xffffff);
	console.log("This is the dequeue node " + node);
	
	//if (count1 == graph.nodeCount)
		//count1 = 0;
	
	
	
	//console.log("THIS IS THE FUCKING COUNT " + count1);
	let i;
	
	for (i = 0; i < graph.nodeCount; i++)
	{
		if (graph.cloneAdjMatrix[node][i] && !visited[i])
		{
			visited[i] = 1; 
			
			q.enqueue(i);
			
			// Problem is that we end up with a node i combo that is otherwise zero and not added to our linkMap
			// So it is necessary to 
			
			
			//console.log("This is the key Value " + key1);
			console.log("This is the node for the key value " + i);
			
			console.log("Q has benn added");
			
			
		}
			
		if (graph.adjMatrix[node][i] == 1)
		{
			let key1 = 10 * node + i;
			graph.linkMap.get(key1).material.color.setHex(0xffffff);
		}
	}
	
	render();
	setTimeout(() => {requestAnimationFrame(function(timestamp) {
		BFS(graph, q, visited, node);})}, 500);
		
	//requestAnimationFrame(function(timestamp) {
	//	BFS(graph, q, visited, node)});
}


function DFS(graph, stack, visited, node)
{
	let i;

	
	
	if (stack.isEmpty())
		return; 
	

	node = stack.pop();
	
	graph.nodes[node].material.color.setHex(0x43ff0a);
	
	if (node == 0)
		graph.nodes[node].material.color.setHex(0xffffff);
		
	if (!visited[node])
	{
		visited[node] = 1;
	}
	
	for (i = 0; i < graph.nodeCount; i++)
	{
		if (graph.cloneAdjMatrix[node][i] && !visited[i])
		{
			//visited[i] = 1; 
			
			stack.push(i); // push the unvisited node that has a link on it to the stack
			
			// Problem is that we end up with a node i combo that is otherwise zero and not added to our linkMap
			// So it is necessary to 
			
			
			//console.log("This is the key Value " + key1);
			console.log("This is the node for the key value " + i);
			
			console.log("Q has benn added");
			
			
		}
			
		if (graph.adjMatrix[node][i] == 1)
		{
			let key1 = 10 * node + i;
			graph.linkMap.get(key1).material.color.setHex(0xffffff);
		}
	}
	
	render();
	setTimeout(() => {requestAnimationFrame(function(timestamp) {
		DFS(graph, stack, visited, node);})}, 500);
}	

function DFS2(graph, visited, node)
{
	let i;
	
	console.log("This is the node and nodeCount " + node + " " + graph.nodeCount);
	if (node >= graph.nodeCount)
		return;
	
	visited[node] = 1;
	
	graph.nodes[node].material.color.setHex(0x43ff0a);
	
	if (node == 0)
		graph.nodes[node].material.color.setHex(0xffffff);
	
	for (i = 0; i < graph.nodeCount; i++)
	{
		console.log("This is the loop varialble in DFS" + i);
		if (graph.cloneAdjMatrix[node][i] && !visited[i])
		{
			render();
			requestAnimationFrame(function(timestamp){
			DFS(graph, visited, i);});
			//render();
			//requestAnimationFrame(function(timestamp) {
			//	DFS(graph, visited, node);
			//});
		}
		// Becasues we do not return from a call back function we have to return somehow.
		
		if (graph.adjMatrix[node][i] == 1)
		{
			let key1 = 10 * node + i;
			graph.linkMap.get(key1).material.color.setHex(0xffffff);
		}
		
	}
}