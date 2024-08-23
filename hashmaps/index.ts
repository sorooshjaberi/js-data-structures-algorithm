import { BidirectionalLinkedList } from "../linkedList/bidirectionalLinkedlist";

class HashMap {
  private _tableArray: BidirectionalLinkedList<[number, unknown]>[];

  constructor(private tableSize: number) {
    this._tableArray = HashMap.createStaticArray(tableSize);
  }

  put(key: number, value: unknown) {
    this.setter(key, value);
  }

  get(key: number) {
    const value = this.getter(key);
    return value?.[1];
  }

  remove(key: number) {
    this.remover(key);
  }

  private remover(index: number) {
    const hashedIndex = this.hasFn(index);
    const itemGroup = this._tableArray[hashedIndex];

    if (!itemGroup) {
      return;
    }

    itemGroup.removeCb((value) => value[0] === index);
  }

  private getter(index: number) {
    const hashedIndex = this.hasFn(index);
    const itemGroup = this._tableArray[hashedIndex];

    if (!itemGroup) {
      return;
    }

    const foundValue = itemGroup.find((value) => value[0] === index);
    return foundValue;
  }

  private setter(index: number, value: unknown) {
    const hashedIndex = this.hasFn(index);

    if (this._tableArray[hashedIndex]) {
      this._tableArray[hashedIndex].push([index, value]);
    } else {
      this._tableArray[hashedIndex] = new BidirectionalLinkedList([
        index,
        value,
      ]);
    }
  }

  private hasFn(index: number) {
    return HashMap.hashFn(index, this.tableSize);
  }

  toArray() {
    return this._tableArray.map((item) => item?.toArray());
  }

  static hashFn(index: number, tableSize: number) {
    return index % tableSize;
  }

  static createStaticArray(arraySize: number) {
    const tableArray = new Array(arraySize);
    tableArray.fill(undefined);
    Object.seal(tableArray);
    return tableArray;
  }
}

const hashmap = new HashMap(10);

hashmap.put(1, "hello");
hashmap.put(11, "hello");
hashmap.put(3, "hello");
hashmap.put(0, "hello");

console.log(hashmap.toArray());
console.log(hashmap.get(11));
hashmap.remove(11);
console.log(hashmap.get(1));
