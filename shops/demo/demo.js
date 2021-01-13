// var arr = [3, 6, 9]
// var newArr = arr.map(i => {
//   return i * i
// })
// console.log(newArr);


// var [a, b, c] = [3, 5, 6]
// console.log(a);
// var [x, y, z] = 'vue'
// console.log(`${x}`);


// function sum(x, y, z) {
//   let total = 0;
//   if (x) total += x
//   if (y) total += y
//   if (z) total += z
//   console.log(`${total}`);
// }
// sum(5, 9)

// function sum(...m) {
//   let total = 0
//   for (var i of m) {
//     total += i
//   }
//   console.log(`${total}`);
// }
// sum(2,3,1,1)

// var [x, y] = [4, 8]
// console.log(...[4, 8]);

let arr1 = [1, 3]
let arr2 = [2, 3]
// console.log(arr1.concat(arr2));
console.log([...arr1, ...arr2]);
console.log(...arr1, ...arr2);

var [x, ...y] = [4, 8, 1, 2]