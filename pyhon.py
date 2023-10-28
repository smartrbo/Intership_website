class Node:
    def __init__(self, key):
        self.key = key
        self.degree = 0
        self.child = None
        self.parent = None
        self.mark = False
        self.next = self
        self.prev = self

class FibonacciHeap:
    def __init__(self):
        self.min_node = None
        self.num_nodes = 0

    def insert(self, key):
        new_node = Node(key)
        if self.min_node:
            self._link(self.min_node, new_node)
            if key < self.min_node.key:
                self.min_node = new_node
        else:
            self.min_node = new_node
        self.num_nodes += 1

    def _link(self, parent, child):
        child.prev = parent
        child.next = parent.next
        parent.next.prev = child
        parent.next = child
        child.parent = parent
        parent.degree += 1
        child.mark = False

    def extract_min(self):
        min_node = self.min_node
        if min_node:
            if min_node.child:
                child = min_node.child
                while True:
                    next_child = child.next
                    child.prev = min_node
                    child.next = min_node.next
                    min_node.next.prev = child
                    min_node.next = child
                    child.parent = None
                    if next_child == min_node.child:
                        break
                    child = next_child

            min_node.prev.next = min_node.next
            min_node.next.prev = min_node.prev

            if min_node == min_node.next:
                self.min_node = None
            else:
                self.min_node = min_node.next
                self._consolidate()

            self.num_nodes -= 1

        return min_node

    def _consolidate(self):
        max_degree = int(self.num_nodes**0.5)  # Simplified degree calculation
        degree_table = [None] * (max_degree + 1)

        current = self.min_node
        nodes_to_visit = [current]
        while nodes_to_visit:
            current = nodes_to_visit.pop(0)
            degree = current.degree

            while degree_table[degree]:
                other = degree_table[degree]
                if current.key > other.key:
                    current, other = other, current
                self._link(other, current)
                degree_table[degree] = None
                degree += 1

            degree_table[degree] = current

        self.min_node = None

        for node in degree_table:
            if node:
                if self.min_node:
                    if node.key < self.min_node.key:
                        self.min_node = node
                else:
                    self.min_node = node

# Example usage
if __name__ == "__main__":
    fibonacci_heap = FibonacciHeap()

    fibonacci_heap.insert(3)
    fibonacci_heap.insert(8)
    fibonacci_heap.insert(2)
    fibonacci_heap.insert(5)

    print("Fibonacci Heap after insertion:")
    print("Min node:", fibonacci_heap.min_node.key)

    # Calculate potential function (simplified as the number of nodes in the heap)
    potential_function = fibonacci_heap.num_nodes
    print("Potential function:", potential_function)

    # Extract the min node
    min_node = fibonacci_heap.extract_min()
    print("\nExtracted min node:", min_node.key)
    print("Fibonacci Heap after extraction:")
    print("Min node:", fibonacci_heap.min_node.key)
    print("Potential function:", fibonacci_heap.num_nodes)
