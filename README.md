# Introduction:
Upon start the graph will begin to transform and layout. Once this operation is complete the GUI can be utilized. In the GUI are two folders with algorithms, a slider to select number of nodes, and a button to clear changes to the graph.
        
# Changing Number of Nodes:
1. Allow graph to settle (very important or else there will be a lot of visual artifacts)
2. In the GUI slide the slider to desired value
3. Release slider
4. View the output of a new graph with specified node count

# Running an Algorithm:
1. Allow graph to settle (very important or else there will be a lot of visual artifacts)
2. In the GUI select a folder to drop down
3. Click on DFS, BFS, or Dijkstra
4. View the output
5. Click the Clear Button to erase visual changes to the graph and output

# Classes and Data Structures:
* Queue: Used to implement Breadth First Search.
* Stack: Used to implement Depth First Search w/out recursion.
* Priority Queue: Used to implement Dijkstra.
* Graph: Facilitates creation of graph, such as nodes & links. As well as, initializing the graph in 3D space.

# Algorithms:
* Eades: Used to do basic force layout of the graph. Consists of treating links like spring forces and unconnected nodes like electrically repulsive forces.
* DFS: Used to traverse graph.
* BFS: Used to traverse graph.
* Dijkstra: Used to find shortest path from origin to every other node.
