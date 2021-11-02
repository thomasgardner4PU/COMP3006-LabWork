function ValArray(arr) {
    return Array.from(new Set(arr));
}

$(function () {
    let arr = [1,2,3,4,5,6,7,8,9]

    let theSet = unique(arr);
    console.log(theSet)
})