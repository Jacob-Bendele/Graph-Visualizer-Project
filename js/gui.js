// Jacob Bendele ja644123
// Final Project Code

//Initializes a DAT GUI to interact with the graph
function initGUI(graph)
{	
	// Creates instance of dat.GUI
	let guiController = new dat.GUI();

	// Creates folders in the dat.GUI
	let pathTraversal = guiController.addFolder("Path Traversal Alogrithms");
	let shortestPath = guiController.addFolder("Shortest Path Algorithms");
	//let nodes = guiController.addFolder("Nodes");

	
	// Creates GUIobject for DAT GUI functionality
	let guiObject = {
		
		NODES : graph.nodeCount,
		
		PATHFINDING : {
			BFS : function() 
			{
				// Setup and Calls Breadth First Search Function
				let q = new Queue();
				let visited = new Array(graph.nodeCount);
				let count1 = 0;
				let linkQ = new Queue();
				
				q.enqueue(0);
				visited[0] = 1;
				BFS(graph, q, visited, 0, linkQ);
				
				//for (const entry of graph.linkMap.entries()) {
				//	console.log(entry);
				//}
			}, 
			
			DFS : function() 
			{
				// Setup and Calls Depth First Search Function
				let visited = new Array(graph.nodeCount);
				let stack = new Stack();
				let linkStack = new Stack();
				
				for (let i = 0; i < graph.nodeCount; i++)
				{
					visited[i] = 0;
				}
				
				stack.push(0); // Start at node 0
				DFS(graph, stack, visited, 0, linkStack);
			}
		},
		
		SHORTESTPATH : {
			Dijkstra : function() 
			{
				// Setup and Calls Dijkstra Function
				let matrix = calcDistance(graph);
				dijkstra(0, matrix, graph, graph.nodeCount - 1);
				render();
			}
			//Bellman : function() {/* Calls Breadth First Search Function*/}
		},
		
		CLEAR: function()
		{			
			// Clears link color changes
			for (const entry of graph.linkMap.keys())
			{
				graph.linkMap.get(entry).material.color.setHex(0x0000ff);
			}
			
			// Clears node color changes
			for (let i = 0; i < graph.nodeCount; i++)
			{
				graph.nodes[i].material.color.setHex(0xff5757);
			}
			
			// Clears generaed HTML tags
			let e = document.querySelector("div");
			let child = e.childNodes;
			
			for (let i = 0; i < child.length; i++)
			{
				e.removeChild(child[i]);

			}

			render();
		}		
	};
	
	// Adds properties and functionalities to GUI from the guiObject
	guiController.add(guiObject, "NODES")
	.name("# of Nodes")
	.min(2).max(12).step(2)
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
	pathTraversal.add(guiObject.PATHFINDING, "BFS").name("BFS");
	pathTraversal.add(guiObject.PATHFINDING, "DFS").name("DFS");
	shortestPath.add(guiObject.SHORTESTPATH, "Dijkstra").name("Dijkstra");
	//shortestPath.add(guiObject.SHORTESTPATH, "Bellman").name("Bellman");
}