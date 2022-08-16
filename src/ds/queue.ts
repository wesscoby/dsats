import { DoublyLinkedList } from './linked-list';
import { Direction } from 'types';

export default class Queue<T> implements Iterable<T> {
  private list: DoublyLinkedList<T>;

  constructor() {
    this.list = new DoublyLinkedList<T>();
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

  /** Get the next value in the list based on the direction
   * @param direction - The direction to peek from
   * @returns the value of the node
   */
  peek(direction: Direction = 'fr') {
    return this.list.peek(direction);
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
   * Add a node to the end of the list
   * @param value - The value to add to the list
   */
  enqueue(value: T) {
    this.list.append(value);
  }

  /**
   * Remove the first node from the list
   * @returns the removed node's value
   */
  dequeue() {
    this.list.shift();
  }

  /**
   * Remove all elements from the list
   */
  clear() {
    this.list.clear();
  }
}
