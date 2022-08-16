interface DoublyLinkedListConstructorOptions<T> {
  next?: LinkedListNode<T>;
  prev?: DoublyLinkedListNode<T>;
}

export class LinkedListNode<T> {
  value: T;
  next?: LinkedListNode<T>;

  constructor(value: T, next?: LinkedListNode<T>) {
    this.value = value;
    this.next = next;
  }
}

export class DoublyLinkedListNode<T> {
  value: T;
  next?: DoublyLinkedListNode<T>;
  prev?: DoublyLinkedListNode<T>;

  constructor(value: T, options?: DoublyLinkedListConstructorOptions<T>) {
    this.value = value;
    this.next = options?.next;
    this.prev = options?.prev;
  }
}
