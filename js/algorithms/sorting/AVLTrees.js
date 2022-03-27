class Node {

    leftChild = new Node();
    rightChild = new Node();
    constructor(value) {
        this.value = value;
    }
}

// const root = new Node(34);

const insert = (root, value) => {
    if (!root)
        return new Node(value);

    if (value < root.value)
        insert(root.leftChild, value)
    else
        insert(root.rightChild, value)

    return root;
}

const root = insert(20);
console.log("root: " + root.value);
console.log("left child: " + root.leftChild.value);
console.log("right child: " + root.rightChild.value);

