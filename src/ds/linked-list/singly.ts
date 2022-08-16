import { Direction } from 'types';
import { isEqual } from 'lodash';
import { LinkedListNode } from './node';
import { OUT_OF_BOUNDS } from 'utils';

/**
 * An ordered set of data elements, each containing a link
 * to its successor (and sometimes its predecessor).
 */
export default class LinkedList<T = any> implements Iterable<T> {
  private _head: LinkedListNode<T> | undefined;
  private _tail: LinkedListNode<T> | undefined;
  private _size = 0;

  constructor(arg?: T | T[]) {
    if (!arg) {
      this._head = undefined;
      this._tail = undefined;
      return;
    }

    if (Array.isArray(arg)) {
      this.concat(arg);
      return;
    }

    this.prepend(arg);
  }

  /**
   * Create a new linked list from an array
   *
   * @remarks The function is static, so it can be called
   * without creating an instance of {@link LinkedList}
   * @typeParam T - the type of array
   * @param array - T[]
   * @returns a new linked list
   * @example
   * ```ts
   * const list = LinkedList.from([1, 2, 3]);
   * list.toArray(); // [1, 2, 3]
   * ```
   */
  static from<T>(array: T[]): LinkedList<T> {
    return new LinkedList<T>().concat(array);
  }

  *[Symbol.iterator](): Iterator<T> {
    if (this._size === 0) return;

    for (let current = this._head; current !== undefined; current = current.next) {
      yield current.value;
    }
  }

  /** Getter method for the size
   * @returns the size of the list.
   */
  size() {
    return this._size;
  }

  isEmpty() {
    return this._size === 0;
  }

  /** Get the next value in the list based on the direction
   * @param direction - The direction to peek from
   * @defaultValue `fr`
   * @returns the value of the node
   */
  peek(direction: Direction = 'fr') {
    return direction === 'fr' ? this._head?.value : this._tail?.value;
  }

  /**
   * Get the node at the given index
   * @param index - The index of the node.
   */
  getNode(index: number) {
    if (index < 0 || index >= this._size) return undefined;

    let current = this._head;
    let i = 0;
    while (i < index) {
      current = current?.next;
      i++;
    }
    return current;
  }

  /**
   * Get the value of the node at the given index
   * @param index - The index of the node.
   * @returns the value of the node.
   */
  get(index: number) {
    const node = this.getNode(index);
    return node?.value;
  }

  /**
   * Get the index of the given value
   * @param value - The value to find the index of
   * @returns the index of the value, or -1 if not found
   */
  indexOf(value: T) {
    if (this._size === 0) return -1;

    let index = 0;
    let current = this._head;
    while (!isEqual(current?.value, value)) {
      current = current?.next;
      index++;
    }

    return index;
  }

  /**
   * Check if the list contains the given value
   * @param value - The value to check for
   * @returns true if the value is in the list, false otherwise
   */
  has(value: T) {
    return this.indexOf(value) !== -1;
  }

  /**
   * Convert the list to an array
   * @returns an array of all the values in the list
   */
  toArray() {
    // if (this.isEmpty()) return [];
    return [...this];
  }

  /**
   * Add an element to the beginning of the list
   * @param value - The value to add
   */
  prepend(value: T): void {
    const node = new LinkedListNode(value, this._head);

    if (this._head) {
      this._head = node;
      this._size++;
      return;
    }

    this._head = node;
    this._tail = node;
    this._size = 1;
  }

  /**
   * Add an element to the end of the list
   * @param value - The value to add
   */
  append(value: T): void {
    const node = new LinkedListNode(value);

    if (this._tail) {
      this._tail.next = node;
      this._tail = node;
      this._size++;
      return;
    }

    this.prepend(value);
  }

  /**
   * It takes an array of items and appends each
   * item to the end of the list
   * @param array - Array to be added.
   * @returns the {@link LinkedList} object
   */
  concat(array: T[]): LinkedList<T> {
    for (const item of array) {
      this.append(item);
    }

    return this;
  }

  /**
   * Add a new node at the given index
   * @param value - Value of the node.
   * @param index - Where you want to insert the value.
   * @throws {@link Error} if the index is out of bounds.
   */
  insert(value: T, index?: number): void {
    if (!index || index === 0) {
      this.prepend(value);
      return;
    }

    if (this._size === 0) {
      this.prepend(value);
      return;
    }

    if (index === this._size - 1) {
      this.append(value);
      return;
    }

    if (index < 0 || index >= this._size) {
      throw new Error(OUT_OF_BOUNDS);
    }

    let current = this._head;
    for (let i = 0; i < index - 1; i++) {
      current = current?.next;
    }

    const node = new LinkedListNode(value, current?.next);
    current!.next = node;
    this._size++;
  }

  /**
   * Change the value of the node at the given index
   * @param value - Value of the node.
   * @param index - Where you want to insert the value.
   * @throws {@link Error} if the index is out of bounds.
   */
  set(value: T, index?: number) {
    if (!index || index === 0) {
      if (this._head) {
        this._head.value = value;
        return;
      }

      this.prepend(value);
      return;
    }

    if (this._size === 0) {
      this.prepend(value);
      return;
    }

    if (index < 0 || index > this._size) {
      throw new Error(OUT_OF_BOUNDS);
    }

    const node = this.getNode(index);
    if (node) {
      node.value = value;
    }
  }

  /**
   * Remove all elements from the list
   */
  clear() {
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
  }

  /**
   * Remove the last node from the list
   * @returns the removed node's value
   */
  pop() {
    if (this._size === 0 || !this._tail) return undefined;

    const value = this._tail.value;

    if (this._size === 1) {
      this.clear();
      return value;
    }

    // Get next to last node
    const node = this.getNode(this._size - 2);
    node!.next = undefined;
    this._tail = node;
    this._size--;
    return value;
  }

  /**
   * Remove the first node from the list
   * @returns the removed node's value
   */
  shift() {
    if (this._size === 0 || !this._head) return undefined;

    const value = this._head.value;

    if (!this._head.next) {
      this.clear();
      return value;
    }

    this._head = this._head.next;
    this._size--;
    return value;
  }

  /**
   * Remove the node at the given index from the list
   * @returns the removed node's value
   */
  removeAt(index: number) {
    if (this.isEmpty()) return undefined;

    if (index === 0) return this.shift();
    if (index === this._size - 1) return this.pop();

    if (index < 0 || index >= this._size) {
      throw new Error(OUT_OF_BOUNDS);
    }

    let current = this._head;
    let i = 0;
    while (i < index) {
      current = current?.next;
      i++;
    }

    const value = current?.value;
    current!.next = current?.next?.next;
    this._size--;
    return value;
  }

  /**
   * Remove the node with the given value from the list
   * @returns the removed node's value
   */
  remove(value: T) {
    const index = this.indexOf(value);
    if (index !== -1) return this.removeAt(index);
    return undefined;
  }
}
