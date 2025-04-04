export const strArraysEqual: (arr1: string[], arr2: string[]) => boolean = (arr1: string[], arr2: string[]) => {
    let res = true;
    
    if (arr1 && arr2 && arr1.length !== arr2.length) res = false;

    arr1.forEach((str1, i) => {
        if (arr2 && str1 !== arr2[i]) res = false;
    });

    return res;
}