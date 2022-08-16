import { LinkedList } from './linked-list';

export default class Stack<T> implements Iterable<T> {
  private list: LinkedList<T>;

  constructor() {
    this.list = new LinkedList<T>();
  }

  *[Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }

  /** Getter method for the size
   * @returns the size of the list.
   */
  get size() {
    return this.list.size();
  }

  isEmpty() {
    return this.list.isEmpty();
  }

  /** Get next value in the list
   * @returns the value of the next node in the list
   */
  peek() {
    return this.list.peek('bk');
  }

  /**
   * Convert the list to an array
   * @returns an array of all the values in the list
   */
  toArray() {
    if (this.isEmpty()) return [];
    return [...this];
  }

  /**
   * Check if the list contains the given value
   * @param value - The value to check for
   * @returns true if the value is in the list, false otherwise
   */
  has(value: T) {
    return this.list.has(value);
  }

  /**
   * Add an element to the end of the list
   * @param value - The value to add
   */
  push(value: T) {
    this.list.append(value);
  }

  /**
   * Remove the last node from the list
   * @returns the removed node's value
   */
  pop() {
    return this.list.pop();
  }

  /**
   * Remove all elements from the list
   */
  clear() {
    this.list.clear();
  }
}
