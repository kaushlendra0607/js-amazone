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
let arr2 = ["apple","grapes","guava","apple","apple","mango","grapes","mango"];
function countWordsArray(words) {
  const wordCount = {};

  for (let word of words) {
    wordCount[word] = (wordCount[word] || 0) + 1;
    //above line is alternative of the following
            //     if (wordCount[word]) {
            //   wordCount[word]++;
            // } else {
            //   wordCount[word] = 1;
            // }
  }

  return Object.entries(wordCount); // returns [['apple', 3], ['banana', 2], ...]
}


// console.log(countWordsArray(arr2));
const arr3 = ["milk","cheese","curd","egg","egg","egg"]

function popEgg(foods){
    foods.reverse();//this will remove last two eggs remove this to pop first two
    let eggPopped = [];
    let two = 0;
    for(let i=0; i<foods.length; i++){
        if((foods[i]==='egg') && two<=1){
            two++;
            continue
        }else{
            eggPopped.push(foods[i]);
            // two++;
        }
    }
    console.log(eggPopped);
    console.log(typeof(eggPopped));
    
}

// popEgg(arr3);

function fizzbuzz(){
    for (let i=1; i<=20; i++){
        if(i%15===0){
            console.log("FizzBuzz");
            continue;
        }
        if(i%3 === 0){
            console.log("Fizz");
            continue;
        }
        if(i%5 === 0){
            console.log("Buzz");
            continue;
        }
        console.log(i);
        

    }
}

// fizzbuzz();

function uniqe(array){
    let wordCount = {};
    let uniqueArray = [];
  for (let word of array) {
    //wordCount[word] = (wordCount[word] || 0) + 1;
    //above line is alternative of the following
     if(!(wordCount[word])){
        wordCount[word]=true;
        uniqueArray.push(word);
    }
  }
  console.log(uniqueArray);
  
}

// uniqe(arr2)

let add =()=>{
    console.log(2+3);
}
add();

function runTwise(funcn){
    funcn();
    funcn();
}

runTwise(add);
runTwise(()=>{console.log('12A');
})
