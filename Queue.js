// Queue Class
class Queue
{
	constructor()
	{
		this.items = [];
	}
	
	enqueue(element)
	{
		this.items.push(element);
	}
	
	dequeue()
	{
		if (this.isEmpty())
			return "Underflow";
		
		return this.items.shift();
	}
	
	isEmpty()
	{
		// Returns true by using comparison ==
		return this.items.length == 0;
	}
}