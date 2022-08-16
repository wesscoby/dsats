import { LinkedListNode, DoublyLinkedListNode } from 'ds';

describe('LinkedListNode', () => {
  describe('without "next" argument', () => {
    let node: LinkedListNode<number>;

    beforeAll(() => {
      node = new LinkedListNode(20);
    });

    it('should create node', () => {
      expect(node).not.toBeNull();
    });

    it('should have node value', () => {
      expect(node.value).toBe(20);
    });

    it('should have next node be undefined', () => {
      expect(node.next).toBeUndefined();
    });
  });

  describe('otherwise', () => {
    let node: LinkedListNode<number>;

    beforeAll(() => {
      node = new LinkedListNode(20, new LinkedListNode(21));
    });

    it('should create node', () => {
      expect(node).not.toBeNull();
    });

    it('should have node value', () => {
      expect(node.value).toBe(20);
    });

    it('should have next node', () => {
      expect(node.next).not.toBeUndefined();
    });

    it('should have next node value', () => {
      expect(node.next?.value).toBe(21);
    });
  });
});

describe('DoublyLinkedListNode', () => {
  describe('without options object', () => {
    let node: DoublyLinkedListNode<number>;

    beforeAll(() => {
      node = new DoublyLinkedListNode(20);
    });

    it('should create node', () => {
      expect(node).not.toBeNull();
    });

    it('should have node value', () => {
      expect(node.value).toBe(20);
    });

    it('should have next node be undefined', () => {
      expect(node.next).toBeUndefined();
    });

    it('should have previous node be undefined', () => {
      expect(node.prev).toBeUndefined();
    });
  });

  describe('with NEXT node', () => {
    let node: DoublyLinkedListNode<number>;

    beforeAll(() => {
      node = new DoublyLinkedListNode(20, { next: new LinkedListNode(21) });
    });

    it('should create node', () => {
      expect(node).not.toBeNull();
    });

    it('should have node value', () => {
      expect(node.value).toBe(20);
    });

    it('should have next node', () => {
      expect(node.next).not.toBeUndefined();
    });

    it('should have next node value', () => {
      expect(node.next?.value).toBe(21);
    });

    it('should have previous node be undefined', () => {
      expect(node.prev).toBeUndefined();
    });
  });

  describe('with PREVIOUS node', () => {
    let node: DoublyLinkedListNode<number>;

    beforeAll(() => {
      node = new DoublyLinkedListNode(20, { prev: new LinkedListNode(19) });
    });

    it('should create node', () => {
      expect(node).not.toBeNull();
    });

    it('should have node value', () => {
      expect(node.value).toBe(20);
    });

    it('should have previous node', () => {
      expect(node.prev).not.toBeUndefined();
    });

    it('should have previous node value', () => {
      expect(node.prev?.value).toBe(19);
    });

    it('should have next node be undefined', () => {
      expect(node.next).toBeUndefined();
    });
  });

  describe('with both next and previous nodes', () => {
    let node: DoublyLinkedListNode<number>;

    beforeAll(() => {
      node = new DoublyLinkedListNode(20, { prev: new LinkedListNode(19), next: new LinkedListNode(21) });
    });

    it('should create node', () => {
      expect(node).not.toBeNull();
    });

    it('should have node value', () => {
      expect(node.value).toBe(20);
    });

    it('should have previous node', () => {
      expect(node.prev).not.toBeUndefined();
    });

    it('should have previous node value', () => {
      expect(node.prev?.value).toBe(19);
    });

    it('should have next node', () => {
      expect(node.next).not.toBeUndefined();
    });

    it('should have next node value', () => {
      expect(node.next?.value).toBe(21);
    });
  });
});
