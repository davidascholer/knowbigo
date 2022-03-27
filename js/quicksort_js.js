const MAX_ARRAY_VALUE = 100;
const QUICKSORT_PLAY_STATES_LENGTH = 5;
const quicksortChildren = document.getElementsByClassName('quicksort-child');
let quicksortPlayState = 0;
let quicksortSubPlayState = 0;
let rightPointer;
let leftPointer;
let pivot;
let leftIndex = 0;
let rightIndex = quicksortChildren.length - 1;
const quicksortQueue = [{ leftIndex: leftIndex, rightIndex: rightIndex }];

//GUI implementations
window.onload = () => {
    for (let child of quicksortChildren) {
        const randomNum = Math.random() * MAX_ARRAY_VALUE;
        child.innerHTML = '' + Math.floor(randomNum);
    }
};

const handleClick = () => {
    quickSort();
}

const animateQuicksort = () => {

    const intervalId = setInterval(function () {
        if (quicksortPlayState === -1)
            clearInterval(intervalId);
        quickSort();
    }, 1000);
}

// const quickSort = (leftIndex = 0, rightIndex = quicksortChildren.length - 1) => {
const quickSort = () => {

    if (quicksortPlayState % QUICKSORT_PLAY_STATES_LENGTH === 0) {

        if (quicksortQueue.length === 0) {
            quicksortPlayState = -1;
            return;
        }

        const currentQuickSort = quicksortQueue.shift();
        leftIndex = currentQuickSort.leftIndex;
        rightIndex = currentQuickSort.rightIndex;

        if (leftIndex >= rightIndex) {
            // markProcessed(leftIndex);
            return;
        }


        rightPointer = rightIndex;
        leftPointer = leftIndex;

        //Show current nodes
        resetNodeStyles();
        showCurrentNodes(leftIndex, rightIndex);

        //Create pivot
        pivot = generateRandomPivot(leftPointer, rightPointer);

        quicksortPlayState++;
    }

    else if (quicksortPlayState % QUICKSORT_PLAY_STATES_LENGTH === 1) {

        //Move pivot and set styles
        quicksortChildren[pivot].classList.remove('pivot');
        switchIndices(leftPointer, pivot);
        pivot = leftPointer;
        quicksortChildren[pivot].classList.add('pivot');

        quicksortPlayState++;
    }

    else if (quicksortPlayState % QUICKSORT_PLAY_STATES_LENGTH === 2) {

        //Show pointers
        quicksortChildren[leftPointer].classList.add('pointer');
        quicksortChildren[rightPointer].classList.add('pointer');

        quicksortPlayState++;
    }

    else if (quicksortPlayState % QUICKSORT_PLAY_STATES_LENGTH === 3) {

        //Move pointers and sort
        // while (leftPointer !== rightPointer) {
        //     rightPointer = movePointerRight(leftPointer, rightPointer, pivot);
        //     leftPointer = movePointerLeft(leftPointer, rightPointer, pivot);
        //     switchIndices(leftPointer, rightPointer);
        // }


        if (quicksortSubPlayState % 3 === 0) {
            rightPointer = movePointerRight(leftPointer, rightPointer, pivot);
            quicksortSubPlayState++;
        }
        else if (quicksortSubPlayState % 3 === 1) {
            leftPointer = movePointerLeft(leftPointer, rightPointer, pivot);
            quicksortSubPlayState++;
        }
        else if (quicksortSubPlayState % 3 === 2) {
            switchIndices(leftPointer, rightPointer);
            iterateQuicksortSub = false;
            quicksortSubPlayState++;
            if (leftPointer === rightPointer) {
                quicksortSubPlayState = 0;
                quicksortPlayState++;
            }
        }

    }

    else if (quicksortPlayState % QUICKSORT_PLAY_STATES_LENGTH === 4) {

        //Move pivot back and set styles
        quicksortChildren[pivot].classList.remove('pivot');
        switchIndices(pivot, rightPointer);
        pivot = rightPointer;
        quicksortChildren[pivot].classList.add('pivot');

        quicksortQueue.push({ leftIndex: leftIndex, rightIndex: pivot - 1 });
        quicksortQueue.push({ leftIndex: pivot + 1, rightIndex: rightIndex });
        quicksortPlayState++;
    }
}

const generateRandomPivot = (leftBoundary, rightBoundary) => {
    const range = rightBoundary - leftBoundary;
    const randomNum = range * Math.random();
    const pivot = Math.floor(randomNum + leftBoundary);
    quicksortChildren[pivot].classList.add('pivot');
    return pivot;
}

const switchIndices = (indexOne, indexTwo) => {
    //Change the inner html and styles
    const temp = quicksortChildren[indexOne].innerHTML;
    quicksortChildren[indexOne].innerHTML = quicksortChildren[indexTwo].innerHTML;
    quicksortChildren[indexTwo].innerHTML = temp;
}

const movePointerLeft = (leftPointer, rightPointer, pivot) => {
    let leftPointerValue = Number(quicksortChildren[leftPointer].innerHTML);
    let pivotValue = Number(quicksortChildren[pivot].innerHTML);
    while (leftPointerValue <= pivotValue && leftPointer < rightPointer) {
        //Set Values
        leftPointer++;
        leftPointerValue = Number(quicksortChildren[leftPointer].innerHTML);
        //Set Styles
        quicksortChildren[leftPointer - 1].classList.remove('pointer');
        quicksortChildren[leftPointer].classList.add('pointer');
    }
    return leftPointer;
}

const movePointerRight = (leftPointer, rightPointer, pivot) => {
    let rightPointerValue = Number(quicksortChildren[rightPointer].innerHTML);
    let pivotValue = Number(quicksortChildren[pivot].innerHTML);
    while (rightPointerValue >= pivotValue && rightPointer > leftPointer) {
        //Set Values
        rightPointer--;
        rightPointerValue = Number(quicksortChildren[rightPointer].innerHTML);
        //Set Styles
        quicksortChildren[rightPointer + 1].classList.remove('pointer');
        quicksortChildren[rightPointer].classList.add('pointer');
    }
    return rightPointer;
}

const showCurrentNodes = (leftBoundary, rightBoundary) => {
    for (let i = leftBoundary; i <= rightBoundary; i++) {
        quicksortChildren[i].classList.add('active');
    }
}
const resetNodeStyles = () => {
    for (let i = 0; i <= quicksortChildren.length - 1; i++) {
        quicksortChildren[i].classList.remove('active');
        quicksortChildren[i].classList.remove('pivot');
        quicksortChildren[i].classList.remove('pointer');
    }
}