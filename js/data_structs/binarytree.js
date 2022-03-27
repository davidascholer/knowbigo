class Node {
    leftChild = null;
    rightChild = null;
    constructor(value) {
        this.value = value;
    }
}

class BinaryTree {
    constructor(root) {
        this.root = root;
    }

    insert(value) {
        let node = this.root;
        const newNode = new Node(value);

        while (true) {
            if (value < node.value) {
                if (node.leftChild == null) {
                    node.leftChild = newNode;
                    break;
                }
                node = node.leftChild;
            }
            else {
                if (node.rightChild == null) {
                    node.rightChild = newNode;
                    break;
                }
                node = node.rightChild;
            }
        }

    }

    find(value) {
        let node = this.root;
        while (node != null) {
            if (node.value === value)
                return true;

            if (value < node.value)
                node = node.leftChild;
            else
                node = node.rightChild;
        }

        return false;
    }

    balanceGraph() {

    }

    printBreadth(nodes) {
        let values = '';
        let newNodes = [];
        for (let node of nodes) {
            values += ' ' + node.value;
            if (node.leftChild !== null)
                newNodes.push(node.leftChild)
            if (node.rightChild !== null)
                newNodes.push(node.rightChild)
        }
        console.log(values)
        if (newNodes.length > 0)
            this.printBreadth(newNodes);
    }

    isSearchTree(node, minValue, maxValue) {

        if (node === null)
            return true;

        if (node.value < minValue || node.value > maxValue)
            return false;

        return (this.isSearchTree(node.leftChild, minValue, node.value)
            && this.isSearchTree(node.rightChild, node.value, maxValue));

    }

    printKNodes(node, distance) {


        if (node === null)
            return;

        if (distance === 0) {
            console.log(node.value);
            return;
        }

        this.printKNodes(node.leftChild, distance - 1);
        this.printKNodes(node.rightChild, distance - 1);

    }
}

// let root = new Node(22);
// let binaryTree = new BinaryTree(root);
// binaryTree.insert(30)
// binaryTree.insert(22)
// binaryTree.insert(20)
// binaryTree.insert(22)
// binaryTree.insert(79)
// binaryTree.insert(09)
// binaryTree.insert(69)
// binaryTree.insert(40)
// binaryTree.insert(96)
// binaryTree.insert(34)
// binaryTree.insert(55)
// binaryTree.insert(66)
// console.log(binaryTree.find(30))
// binaryTree.printBreadth([root]);

module.exports = BinaryTree;