// export default {name: 'test'}
import matrixTool from './lib/matrixTool.js';
import tool from './lib/tool.js';

import MakeSolution from './lib/makeSolution.js'

import {checkerTool, Checker} from './lib/checker.js';

// 工具测试

// matrixTool 二维数组生成工具测试
/*
let items = matrixTool.makeMatrix();
let _arrs = items.map(item => item.map((v, i) => i));
let arrs = _arrs.map( arr => tool.shuffle(arr));
console.log(arrs);
*/

// 索引关系转换工具测试
/*
let cell = tool.convertPosition(5, 6);
console.log(cell);
let box = matrixTool.boxMatrix(arrs, cell.rowIndex, cell.colIndex);
console.log(box.boxValue);
console.log(arrs[cell.rowIndex][cell.colIndex]);
console.log(box.boxValueIndex);
*/



// make类测试
/*
const maker = new MakeSolution();
maker.init();
console.log(maker.matrix);
*/


// checker test
/*
let arr = [1,2,3,4,5,8,9,7,6];
console.log(arr);
console.log(checkerTool.checkArray(arr));
let arr1 = [1,2,0,3,4,0,0,8,9];
console.log(arr1);
console.log(checkerTool.checkArray(arr1));
let arr2 = [1,1,2,0,0,3,4,5,3]
console.log(arr2);
console.log(checkerTool.checkArray(arr2));
*/

//  Checker 类 测试
/*
const maker = new MakeSolution();
maker.init();
const matrix_arr = maker.matrix;

const checker = new Checker(matrix_arr);
checker.check();
console.log(checker.matrix);
console.log(checker.matrixMarks);
console.log(checker.isSuccess);

matrix_arr[1][2] = 0;
matrix_arr[3][6] = matrix_arr[8][6];
const checker2 = new Checker(matrix_arr);
checker2.check();
console.log(checker.matrix);
console.log(checker2.matrixMarks);
console.log(checker2.isSuccess);
*/

import Shuduku from './core/shuduku.js';

const shudu = new Shuduku();
shudu.makePuzzle();
console.log(shudu.solutionMatrix);
console.log(shudu.puzzleMatrix);




