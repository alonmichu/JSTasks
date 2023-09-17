"use strict";

function binary_search(array, number) {
    // function of binary search for finding number in the sorted array
    // returns index of the found number or -1 in case of failure
    if (array == [] || array[0] > number || array[array.length - 1] < number) {
        return -1;
    }
    let left = 0;
    let right = array.length - 1;
    while (left < right) {
        if (right - left === 1) {
            if (array[right] === number) {
                return right;
            } else if (array[left] === number) {
                return left;
            } else {
                return -1;
            }
        }
        let middle = left + Math.floor((right - left) / 2);
        if (array[middle] === number) {
            return middle;
        } else if (array[middle] > number) {
            right = middle;
        } else {
            left = middle;
        }
    }
    return -1;
}

function find_sum_idx(array, number) {
    if (array.length < 2) {
        return [];
    }
    let min_sum = array[0] + array[1];
    let max_sum = array[array.length - 1] + array[array.length - 2];
    if (number < min_sum || number > max_sum) {
        return [];
    }
    // we look at elements from the beginning till the moment when the current element is bigger than number/2
    // we check if there is an element equal to difference between number and current element in the array
    // if the sum need two equal elements we check that there are two similar numbers in the array
    for (let i = 0; i < array.length; i++) {
        if (array[i] <= number / 2) {
            let idx = binary_search(array, number - array[i]);
            if (idx != -1 && idx != i) {
                return [i, idx];
            } else if (idx === i && i != array.length - 1 && array[i + 1] === array[i]) {
                return [i, i + 1];
            }
        } else {
            break;
        }
    }
    return [];
}


try {
    // as we do not need the first met pair of indexes, we can find any of them
    // otherwise binary search should be replaced by indexOf, which will decrease efficiency
    test(find_sum_idx, [[1, 2, 3, 4], 7], `${[2, 3]}`);
    test(find_sum_idx, [[1, 2, 3, 4, 7, 90, 641, 1024], 7], `${[2, 3]}`);
    test(find_sum_idx, [[1], 7], `${[]}`);
    test(find_sum_idx, [[1, 2, 3, 4, 4, 10], 8], `${[3, 4]}`);
    test(find_sum_idx, [[1, 2, 3, 4], 0], `${[]}`);
    test(find_sum_idx, [[1, 2, 3, 4], 115], `${[]}`);
    test(find_sum_idx, [[1, 2, 3, 4], 8], `${[]}`);
    test(find_sum_idx, [[1, 2, 3, 4, 4], 8], `${[3, 4]}`);
    test(find_sum_idx, [[1, 1, 1, 1, 1, 2, 3, 4], 2], `${[0, 3]}`);
    test(find_sum_idx, [[-1, -2, 3, 4, 9], 7], `${[1, 4]}`);

    console.info("Congratulations! All tests passed.");
} catch(e) {
    console.error(e);
}

// Простая функция тестирования
function test(call, args, count, n) {
    let r = (call.apply(n, args) == count);
    console.assert(r, `Found items count: ${count}`);
    if (!r) throw "Test failed!";
}