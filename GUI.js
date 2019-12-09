function initGUI(graph)
{	
	// Creates instance of dat.GUI
	let guiController = new dat.GUI();

	// Creates folders in the dat.GUI
	let pathTraversal = guiController.addFolder("Path Traversal Alogrithms");
	let shortestPath = guiController.addFolder("Shortest Path Algorithms");
	//let nodes = guiController.addFolder("Nodes");

	
	// Creates GUIobject
	let guiObject = {
		
		NODES : graph.nodeCount,
		
		PATHFINDING : {
			BFS : function() 
			{
				for (const entry of graph.linkMap.entries()) {
					console.log(entry);
				}
				let q = new Queue();
				let visited = new Array(graph.nodeCount);
				let count1 = 0;
				
				q.enqueue(0);
				visited[0] = 1;
				BFS(graph, q, visited, 0);/* Calls Breadth First Search Function*/
			}, 
			DFS : function() 
			{
				/* Calls Depth First Search Function*/
				let visited = new Array(graph.nodeCount);
				let stack = new Stack();
				
				for (let i = 0; i < graph.nodeCount; i++)
				{
					visited[i] = 0;
				}
				
				stack.push(0); // Start at 0
				DFS(graph, stack, visited, 0);
			}
		},
		
		SHORTESTPATH : {
			Dijkstra : function() 
			{
				
				/* Calls Breadth First Search Function*/
				let matrix = calcDistance(graph);
				let path = dijkstra(0, matrix, graph, graph.nodeCount - 1);
				console.log(path);
				
			}, 
			Bellman : function() {/* Calls Breadth First Search Function*/}
		},
		
		CLEAR: 
		function()
		{
			
			for (const entry of graph.linkMap.keys())
			{
				graph.linkMap.get(entry).material.color.setHex(0x0000ff);
			}
			
			for (let i = 0; i < graph.nodeCount; i++)
			{
				graph.nodes[i].material.color.setHex(0xff5757);
			}
			render();
		}
	
		//START : 
		//function(){
			
		//}
				
	};
	
	// Adds property to GUI for scaling the rendered object
	guiController.add(guiObject, "NODES")
	.name("# of Nodes")
	.min(2).max(16).step(2)
	.onFinishChange(
		function(val)
		{
			count = 0;
			clearScene();
			graph = new Graph(val);
			animate(graph);
			
		}
	);
	
	guiController.add(guiObject, "CLEAR").name("Clear Changes");
	
	
	// Adds property to GUI for translating the rendered object along x, y, and z axes.
	pathTraversal.add(guiObject.PATHFINDING, "BFS").name("BFS");
	
	pathTraversal.add(guiObject.PATHFINDING, "DFS").name("DFS");
	
	shortestPath.add(guiObject.SHORTESTPATH, "Dijkstra").name("Dijkstra");

	shortestPath.add(guiObject.SHORTESTPATH, "Bellman").name("Bellman");
	
	//.add(guiObject, "START").name("Run Algorithm");
	
	// Adds properties to GUI for Key Light
	/*keyLightFolder.add(guiObject.KEY, "visKey")
	.name("Key Light On/Off")
	.onChange(
		function(flag)
		{
			keyLight.visible = flag;
			render();
		}
	);
	
	keyLightFolder.add(guiObject.KEY, "intensKey")
	.min(0).max(1).step(0.1)
	.name("Key Intensity")
	.onChange(
		function(val)
		{
			keyLight.intensity = val;
			render();
		}
	);
	
	keyLightFolder.addColor(guiObject.KEY, "colorKey")
	.name("Key Color")
	.onChange(
		function(hexstring)
		{
			keyLight.color.set(hexstring)
			render();
		}
	);*/
}