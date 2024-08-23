class PriorityClass {
  queue: number[] = [];

  constructor() {}

  enqueue(value: number) {
    if (this.queue.length === 0) {
      this.queue.push(value);
      return;
    }

    for (let index = this.queue.length; index > 0; index--) {
      const fromLastItem = this.queue[index - 1];

      if (value > fromLastItem) {
        this.queue[index] = value;
        break;
      } else {
        this.queue[index] = fromLastItem;
        if (index === 1) {
          this.queue[0] = value;
        }
      }
    }
  }

  dequeue() {}
}

const queue = new PriorityClass();

queue.enqueue(3);
queue.enqueue(2);
queue.enqueue(10);
queue.enqueue(4);
queue.enqueue(5);

console.log(queue.queue);
