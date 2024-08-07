import { BidirectionalLinkedList } from "../linkedList/bidirectionalLinkedlist";

class Queue<T = unknown> {
  private _linkedList: BidirectionalLinkedList<T>;
  constructor(private cap?: number) {
    this._linkedList = new BidirectionalLinkedList();
  }

  enqueue(value: T) {
    if (this.cap !== undefined && this._linkedList.length === this.cap) {
      return;
    }
    this._linkedList.push(value);
  }

  toArray() {
    return this._linkedList.toArray();
  }

  dequeue() {
    return this._linkedList.popFirst();
  }

  peek() {
    return this._linkedList.peekFirst();
  }

  reverse() {
    this._linkedList.reverse();
    return this;
  }

  isEmpty() {
    return this._linkedList.isEmpty();
  }

  isFull() {
    return this.cap !== undefined && this._linkedList.length === this.cap;
  }
}

const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(5);
queue.dequeue();
console.log(queue);

const rev = queue.reverse();

console.log(rev.toArray());
