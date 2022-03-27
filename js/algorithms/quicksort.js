const generateRandomArray = (length, maxLength) => {
    const generatedArray = [];
    for (let i = 0; i < length; i++) {
        const randomNum = Math.random() * maxLength;
        generatedArray.push(Math.floor(randomNum));
    }
    return generatedArray;
}

const theArray = generateRandomArray(20, 100);

const quickSort = (leftIndex, rightIndex) => {

    let rightPointer;
    let leftPointer;
    let pivotIndex;
    let pivot;

    if (leftIndex >= rightIndex)
        return;

    rightPointer = rightIndex;
    leftPointer = leftIndex;

    //Create pivot
    pivotIndex = generateRandomPivot(leftPointer, rightPointer);
    pivot = theArray[pivotIndex];

    //Move the pivot out of the way, to either the right or left index. We'll switch it with the left index.
    switchIndices(leftIndex, pivotIndex);

    //Move pointers and sort.
    while (leftPointer !== rightPointer) {

        //Pointer opposite of the index must go first.

        //Move the right pointer to where the value is less than the pivot.
        while (theArray[rightPointer] >= pivot && rightPointer > leftPointer)
            rightPointer--;

        //Move the left pointer to where the value is more than the pivot.
        while (theArray[leftPointer] <= pivot && leftPointer < rightPointer)
            leftPointer++;

        switchIndices(leftPointer, rightPointer);
    }

    //Move the pivot back to it's place in the array
    pivotIndex = rightPointer;
    switchIndices(leftIndex, pivotIndex);

    quickSort(leftIndex, pivotIndex - 1);
    quickSort(pivotIndex + 1, rightIndex);
}

const generateRandomPivot = (leftBoundary, rightBoundary) => {
    const range = rightBoundary - leftBoundary;
    const randomNum = range * Math.random();
    return Math.floor(randomNum + leftBoundary);
}

const switchIndices = (indexOne, indexTwo) => {
    //Change the inner html and styles
    const temp = theArray[indexOne];
    theArray[indexOne] = theArray[indexTwo];
    theArray[indexTwo] = temp;
}

console.log(theArray);
quickSort(0, theArray.length - 1);
console.log(theArray);
