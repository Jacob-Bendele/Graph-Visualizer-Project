// Jacob Bendele ja644123
// Final Project Code

function BFS(graph, q, visited, node)
{	
	if (q.isEmpty())
	{
		return;
	}
	
	node = q.dequeue();
	graph.nodes[node].material.color.setHex(0x43ff0a);
	
	if (node == 0)
		graph.nodes[node].material.color.setHex(0xffffff);
	
	for (let i = 0; i < graph.nodeCount; i++)
	{
		if (graph.cloneAdjMatrix[node][i] && !visited[i])
		{
			visited[i] = 1; 
			q.enqueue(i);
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
}

function DFS(graph, stack, visited, node)
{
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
	
	for (let i = 0; i < graph.nodeCount; i++)
	{
		if (graph.cloneAdjMatrix[node][i] && !visited[i])
		{
			stack.push(i); // push the unvisited node that has a link on it to the stack
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

function calcDistance(graph)
{
	let matrix = new Array(graph.nodeCount);
	
	for (let i = 0; i < graph.nodeCount; i++)
	{
		matrix[i] = new Array(graph.nodeCount);
	}
	
	for (let i = 0; i < graph.nodeCount; i++)
	{
		for (let j = 0; j < graph.nodeCount; j++)
		{
			if (graph.cloneAdjMatrix[i][j] == 1)
			{
				
				 matrix[i][j] = graph.nodes[i].position.distanceTo(graph.nodes[j].position);
				 console.log("This is the matrix distance associated with " + matrix[i][j]);
			}
			
			else
				matrix[i][j] = 0;
		}
	}
	
	return matrix;
}


// This version of dijkstra is going to find the shortest path to all nodes.
// Therefore a list of the shortest paths can be returned and either the shortest path can be displayed
// or a gradient of color can be observed with the most intense being the shortest path to the last
// element.
function dijkstra(start, matrix, graph, end)
{
	let distance = new Array(graph.nodeCount);
	let visited = new Array(graph.nodeCount);
	let path = [];

	let numVisited = 0;
	
	let pq = new PriorityQueue();
	distance.fill(1000000); // infinte
	distance[start] = 0;
	
	let ol = document.createElement("ol");
	document.getElementById("info").appendChild(ol);
	
	
	if (start == 0)
	{	
		render();
		graph.nodes[start].material.color.setHex(0xffffff);
	}
	
	for (let i = 0; i < graph.nodeCount; i++)
	{
		pq.enqueue(i, distance[i]); 
	}
	
	while(!pq.isEmpty() && numVisited < graph.nodeCount)
	{
		let vertex = pq.dequeue();
		
		if (visited[vertex.element]) 
			continue;
		
		visited[vertex.element] = true;
		let li = document.createElement("li");
		let text = document.createTextNode("Node " + vertex.element + " " + "Distance " + vertex.priority);
		li.appendChild(text);
		ol.appendChild(li);
		numVisited++;
		
		for (let i = 0; i < graph.nodeCount; i++)
		{
			if (matrix[vertex.element][i] > 0 && distance[vertex.element] + matrix[vertex.element][i] < distance[i])
			{
				distance[i] = distance[vertex.element] + matrix[vertex.element][i];
				pq.enqueue(i, distance[i]);
			}
		}
	}
}






