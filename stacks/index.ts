class StackNode<T = unknown> {
  prevNode: StackNode<T> | null;
  nextNode: StackNode<T> | null;

  constructor(public value: T) {
    this.prevNode = this.nextNode = null;
  }

  setPrevNode(prevNode: StackNode<T> | null) {
    this.prevNode = prevNode;
  }

  setNextNode(nextNode: StackNode<T> | null) {
    this.nextNode = nextNode;
  }
}

class Stack<T = unknown> {
  headNode: StackNode<T> | null;
  tailNode: StackNode<T> | null;

  constructor(value?: T) {
    this.headNode = this.tailNode = value ? new StackNode(value) : null;
  }

  isEmpty() {
    return !this.headNode;
  }

  isSingleValue() {
    return this.headNode === this.tailNode;
  }

  push(value: T) {
    const newNode = new StackNode(value);
    if (this.isEmpty()) {
      this.headNode = this.tailNode = newNode;
      return;
    }

    this.tailNode!.setNextNode(newNode);
    newNode.setPrevNode(this.tailNode);

    this.tailNode = newNode;
  }

  pop() {
    if (this.isSingleValue()) {
      const lastNode = this.tailNode;

      this.headNode = this.tailNode = null;

      return lastNode?.value;
    }

    let iteratee = this.headNode;

    while (iteratee) {
      if (iteratee.nextNode === this.tailNode) {
        const lastNode = iteratee.nextNode;
        iteratee.nextNode = null;
        lastNode!.prevNode = null;

        this.tailNode = iteratee;

        return lastNode?.value;
      }

      iteratee = iteratee.nextNode;
    }
  }

  peek() {
    if (this.isSingleValue()) {
      const lastNode = this.tailNode;

      return lastNode?.value;
    }

    let iteratee = this.headNode;

    while (iteratee) {
      if (iteratee.nextNode === this.tailNode) {
        const lastNode = iteratee.nextNode;

        return lastNode?.value;
      }

      iteratee = iteratee.nextNode;
    }
  }
}
function reverseString(str: string) {
  const stack = new Stack<string>();

  Array.from(str).forEach((char) => stack.push(char));

  let newStr = "";

  let char = stack.pop();

  while (char) {
    newStr += char;
    char = stack.pop();
  }

  return newStr;
}

function getIsStringBalance(str: string) {
  const openingChars = ["[", "<", "("];
  const closingChars = ["]", ">", ")"];

  const stack = new Stack<string>();
  const chars = Array.from(str);

  for (let i = 0; i <= chars.length; i++) {
    const char = chars[i];

    if (openingChars.includes(char)) {
      stack.push(char);
    } else if (closingChars.includes(char)) {
      const lastChar = stack.pop();

      if (
        !(
          lastChar &&
          openingChars.indexOf(lastChar) === closingChars.indexOf(char)
        )
      ) {
        return false;
      }
    }
  }

  if (stack.peek() && openingChars.includes(stack.peek() || "")) {
    return false;
  }

  return true;
}

const str = "HELLO";

console.log(reverseString(str));

console.log(getIsStringBalance(""));
