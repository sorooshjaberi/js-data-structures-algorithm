class LinkedNode {
  nextNode: LinkedNode | null;

  constructor(public value: unknown) {
    this.nextNode = null;
  }

  setNextNode(nextNode: LinkedNode) {
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  private headNode: LinkedNode | null;
  private tailNode: LinkedNode | null;
  isEmpty() {
    return !this.headNode;
  }

  constructor(value?: unknown) {
    this.headNode = this.tailNode = value ? new LinkedNode(value) : null;
  }

  push(value: unknown) {
    const newNode = new LinkedNode(value);
    if (this.isEmpty()) {
      this.headNode = this.tailNode = newNode;
      return;
    }

    this.tailNode?.setNextNode(newNode);

    this.tailNode = newNode;
  }

  pop() {
    let iteratee = this.headNode;

    while (iteratee) {
      if (iteratee.nextNode === this.tailNode) {
        const lastNode = iteratee.nextNode
        iteratee.nextNode = null;
        this.tailNode = iteratee
        return lastNode?.value  
      }

      iteratee = iteratee.nextNode;
    }
  }
}

const linkedList = new LinkedList();

linkedList.push(1)
linkedList.push(2)
linkedList.push(3)
linkedList.push(4)


console.log(JSON.stringify(linkedList, undefined, 2));
