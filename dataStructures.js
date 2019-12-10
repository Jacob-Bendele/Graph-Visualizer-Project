// Jacob Bendele ja644123
// Final Project Code

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

class QElement
{
	constructor(element, priority)
	{
		this.element = element; 
		this.priority = priority;
	}
}

class PriorityQueue
{
	constructor()
	{
		this.items = [];
	}
	
	enqueue(element, priority)
	{
		let qElement = new QElement(element, priority);
		let contain = false;
		
		for (let i = 0; i < this.items.length; i++)
		{
			if (this.items[i].priority > qElement.priority)
			{
				this.items.splice(i, 0, qElement);
				contain = true;
				break;
			}
		}
		
		if (!contain)
		{
			this.items.push(qElement);
		}
	}
	
	dequeue()
	{
		if (this.isEmpty())
			return "Underflow";
		
		return this.items.shift();
	}
	
	isEmpty()
	{
		return this.items.length == 0;
	}
}