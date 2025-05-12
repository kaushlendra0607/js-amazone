const arr = [1,2,-9,4,0,6,7,8,9];
const arr1= [];
// arr1[0]==null ? console.log('true') : console.log('false');




// function arraySwap(array){
// let newArr = array;
// let temp = array[0];
// newArr[0]=array[length-1];
// newArr[length-1]=temp;
// return newArr;
// }

// let it = arraySwap(arr);
// console.log(it);
function minMax(array){
    const length=array.length;
        let max=0;
        let min=0;
        let temp = 0;
    if(array[0] == null){
        let max = null;
        let min = null;
        console.log(`max is ${max} and min is ${min}`);
        return;
    }
    for(let j=0;j<length;j++){
        for(let i=0;i<length-1-j;i++)
            if(array[i]>array[i+1]){
            temp=array[i];
            array[i]=array[i+1];
            array[i+1]=temp;
       }
    }
    max = array[length-1];
    min = array[0];
    console.log(`max is ${max} and min is ${min}`);
    console.log(array);
}


// minMax(arr);

