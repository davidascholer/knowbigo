/*
Formula for figuring out which 
*/
const MAX_ARRAY_VALUE = 100;
const INITIAL_NODE_DIMENSIONS = 40;
const BINARYTREE_PLAY_STATES_LENGTH = 5;
const ANIMATION_DURATION = 500;
const MIN_CIRCLE_SIZE = 10;
const BT_DEPTH_MARGIN = 10;
const binaryTreeChildContainer = document.querySelector('.binary-tree-child-container');
const binaryTreeGrid = document.querySelector('.binary-tree-grid');
const btCanvas = document.querySelector('.binary-tree-canvas');
btCanvas.width = binaryTreeGrid.offsetWidth;
btCanvas.height = binaryTreeGrid.offsetHeight;
const btCanvas2dContext = btCanvas.getContext("2d");
const nodeElements = [];
const positionsByDepth = [];
const MAX_TREE_UNITS_HEIGHT = 8;
const MAX_TREE_UNITS_WIDTH = Math.pow(2, MAX_TREE_UNITS_HEIGHT - 1);
const containerWidth = binaryTreeGrid.offsetWidth;
let root = null;

class Node {
    leftChild = null;
    rightChild = null;
    position = {
        depth: null,
        leafPos: null

    };
    constructor(value, element) {
        this.value = value;
        this.element = element;
    }
}

//GUI implementations
window.onload = () => {

    binaryTreeChildContainer.style.width = INITIAL_NODE_DIMENSIONS * MAX_TREE_UNITS_HEIGHT + 'px';
    binaryTreeChildContainer.style.height = INITIAL_NODE_DIMENSIONS + 'px';
    for (let child = 0; child < MAX_TREE_UNITS_HEIGHT; child++) {

        //GUI implementations
        const randomNum = Math.floor(Math.random() * MAX_ARRAY_VALUE);
        const nodeElement = document.createElement('span');
        nodeElement.classList.add('binary-tree-child');
        nodeElement.id = 'btChild' + child;
        nodeElement.style.width = INITIAL_NODE_DIMENSIONS + 'px';
        nodeElement.style.height = INITIAL_NODE_DIMENSIONS + 'px';
        nodeElement.innerHTML = randomNum;
        binaryTreeChildContainer.appendChild(nodeElement);
        nodeElement.style.left = INITIAL_NODE_DIMENSIONS * child + 'px';
        nodeElement.style.top = 0 + 'px';
        nodeElement.style.border = '1px solid black';

        //Map data to Node object
        nodeElements.push(new Node(randomNum, nodeElement));
    }

    implementGraph();
};

function generateBinaryTree() {
    const animateBinaryTree = setInterval(() => {
        let node = nodeElements.shift();
        if (nodeElements.length <= 0)
            clearInterval(animateBinaryTree);

        if (root === null) {
            root = node;
            setPosition(null, node, null);
            moveNode(node);
            return;
        }

        let branch = root;

        while (true) {
            if (node.value < branch.value) {
                if (branch.leftChild === null) {
                    branch.leftChild = node;
                    setPosition(branch, node, 0);
                    moveNode(node);
                    drawLine(branch, node);
                    break;
                }
                branch = branch.leftChild;
            }
            else {
                if (branch.rightChild === null) {
                    branch.rightChild = node;
                    setPosition(branch, node, 1);
                    moveNode(node);
                    drawLine(branch, node);
                    break;
                }
                branch = branch.rightChild;
            }
        }
    }, ANIMATION_DURATION)
}

function getHeight(branch) {

    if (branch === null) return -1;

    //Check if it's a leaf
    if (branch.left === null && branch.right === null)
        return 0;


    const left = getHeight(branch.leftChild);
    const right = getHeight(branch.rightChild);
    return 1 + Math.max(left, right);


}
function breadthfirstSearch(branch) {

    if (branch === null)
        return;

    console.log(branch.value);

}
function preOrderTraversal(branch) {
    if (branch === null)
        return;

    console.log(branch.value);
    preOrderTraversal(branch.leftChild);
    preOrderTraversal(branch.rightChild);

}
function inOrderTraversal(branch) {
    if (branch === null)
        return;

    inOrderTraversal(branch.leftChild);
    console.log(branch.value);
    inOrderTraversal(branch.rightChild);

}
function postOrderTraversal(branch) {
    if (branch === null)
        return;

    postOrderTraversal(branch.leftChild);
    postOrderTraversal(branch.rightChild);
    console.log(branch.value);
}
function runGetHeight() {
    const height = getHeight(root);
    console.log(height)
}
function runBreadthfirstSearch() {
    breadthfirstSearch(root);
}
function runPreOrderTraversal() {
    preOrderTraversal(root);
}
function runInOrderTraversal() {
    inOrderTraversal(root);
}
function runPostOrderTraversal() {
    postOrderTraversal(root);
}

function setPosition(parentNode, childNode, posValue) {
    if (parentNode === null) {
        childNode.position.depth = 0;
        childNode.position.leafPos = 0;
        return;
    }
    //Set the depth
    childNode.position.depth = parentNode.position.depth + 1;
    //Set the leaf number
    childNode.position.leafPos = parentNode.position.leafPos * 2 + posValue;
}

function moveNode(node) {
    //Set styles
    const element = document.getElementById(node.element.id);
    const childCoords = positionsByDepth[node.position.depth][node.position.leafPos];
    element.animate([
        // keyframes
        {
            top: element.style.top,
            left: element.style.left,
            width: element.style.width,
            height: element.style.height
        },
        {
            top: childCoords.y + INITIAL_NODE_DIMENSIONS + 'px',
            left: childCoords.x + 'px',
            width: childCoords.diameter + 'px',
            height: childCoords.diameter + 'px'
        }
    ], {
        // timing options
        duration: ANIMATION_DURATION,
        fill: 'forwards'
    });
}

function drawLine(parent, child) {
    const childCoords = positionsByDepth[child.position.depth][child.position.leafPos];
    const parentCoords = positionsByDepth[parent.position.depth][parent.position.leafPos];
    let lineFromX = parentCoords.x + parentCoords.diameter / 2;
    let lineFromY = parentCoords.y + parentCoords.diameter / 2;
    let lineToX = childCoords.x + childCoords.diameter / 2;
    let lineToY = childCoords.y + childCoords.diameter / 2;

    setTimeout(() => {
        btCanvas2dContext.beginPath();
        btCanvas2dContext.moveTo(lineFromX, lineFromY);
        btCanvas2dContext.lineTo(lineToX, lineToY);
        btCanvas2dContext.stroke();
    }, ANIMATION_DURATION)
}

function implementGraph() {
    let top = 0;
    //Iterate through 
    for (let row = 0; row < MAX_TREE_UNITS_HEIGHT; row++) {
        const newRow = document.createElement('div');
        const gridRow = [];
        newRow.classList.add('binary-tree-row');
        //Set the pixel value of the matrix
        let diameter = MIN_CIRCLE_SIZE * (MAX_TREE_UNITS_HEIGHT - row);
        if (row > 3)
            diameter = MIN_CIRCLE_SIZE * (MAX_TREE_UNITS_HEIGHT - row) * .5;
        else if (row === 3)
            diameter = MIN_CIRCLE_SIZE * (MAX_TREE_UNITS_HEIGHT - row) * .75;

        const power = Math.pow(2, row);
        for (let column = 0; column < power; column++) {

            //Fill in the matrix w the coordinates relative to it's container.
            const scaledValue = containerWidth / power;
            const positionedValue = scaledValue * column + scaledValue * .5 - diameter * .5;
            const values = { x: positionedValue, y: top, diameter: diameter };
            gridRow.push(values);
            //Add each unit to dom.
            const unit = document.createElement('span');
            unit.classList.add('binary-tree-position');
            unit.style.left = values.x + 'px';
            unit.style.top = values.y + 'px';
            unit.style.width = values.diameter + 'px';
            unit.style.height = values.diameter + 'px';
            binaryTreeGrid.appendChild(unit);

        }
        //Set the top for the next iteration.
        top += diameter + BT_DEPTH_MARGIN;
        //Add each dimension to the matrix.
        positionsByDepth.push(gridRow);
    }
}

function drawLines(trees) {
    for (let tree in trees) {
        for (let node in trees[tree]) {
            if (tree > 0) {
                let lineFromX = trees[tree - 1][Math.floor(node / 2)].x + trees[tree - 1][Math.floor(node / 2)].diameter / 2;
                let lineFromY = trees[tree - 1][Math.floor(node / 2)].y + trees[tree - 1][Math.floor(node / 2)].diameter / 2;
                let lineToX = trees[tree][node].x + trees[tree][node].diameter / 2;
                let lineToY = trees[tree][node].y + trees[tree][node].diameter / 2;
                drawLine(lineFromX, lineFromY, lineToX, lineToY);
            }
        };
    }
}