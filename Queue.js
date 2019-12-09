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

class Stack
{
	constructor()
	{
		this.items = [];
	}
	
	push(element)
	{
		this.items.push(element);
	}
	
	pop()
	{
		if (this.items.length == 0)
			return "Underflow";
		
		return this.items.pop();
	}
	
	isEmpty()
	{
		return this.items.length == 0;
	}
}