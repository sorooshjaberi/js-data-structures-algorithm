import { BidirectionalLinkedList } from "../linkedList/bidirectionalLinkedlist";

const Stack = BidirectionalLinkedList;

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
