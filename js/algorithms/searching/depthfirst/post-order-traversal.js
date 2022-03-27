const BinaryTree = require('../../../data_structs/binarytree');
class Node {
    leftChild = null;
    rightChild = null;
    constructor(value) {
        this.value = value;
    }
}

(function () {
    let root = new Node(22);
    let binaryTree = new BinaryTree(root);
    //binary tree
    binaryTree.insert(30)
    binaryTree.insert(22)
    binaryTree.insert(20)
    binaryTree.insert(22)
    binaryTree.insert(79)
    binaryTree.insert(09)
    binaryTree.insert(69)
    binaryTree.insert(40)
    binaryTree.insert(96)
    binaryTree.insert(34)
    binaryTree.insert(55)
    binaryTree.insert(66)
    // console.log(binaryTree.isEqual(binaryTree.root,binaryTreeTwo.root));
    // console.log(binaryTree.isSearchTree(root,-Infinity,Infinity))
    binaryTree.printBreadth([root]);
    // binaryTree.printKNodes(root,3);

}())