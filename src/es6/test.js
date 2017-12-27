// export default {name: 'test'}
import matrix from './lib/matrix.js';
import tool from './lib/tool.js';

import Make from './lib/make.js'

import checker from './lib/checker.js';

// 工具测试
/*
let items = matrix.makeMatrix();
let _arrs = items.map(item => item.map((v, i) => i));
let arrs = _arrs.map( arr => tool.shuffle(arr));
console.log(arrs);

let cell = tool.convertPosition(5, 6);
console.log(cell);
let box = matrix.boxMatrix(arrs, cell.rowIndex, cell.colIndex);
console.log(box.boxValue);
console.log(arrs[cell.rowIndex][cell.colIndex]);
console.log(box.boxValueIndex);
*/


// make类测试
/*
const maker = new Make();
maker.init();
console.log(maker.matrix);
*/


// checker test
let arr = [1,2,3,4,5,8,9,7,6];
console.log(arr);
console.log(checker.checkArray(arr));
let arr1 = [1,2,0,3,4,0,0,8,9];
console.log(arr1);
console.log(checker.checkArray(arr1));
let arr2 = [1,1,2,0,0,3,4,5,6]
console.log(arr2);
console.log(checker.checkArray(arr2));