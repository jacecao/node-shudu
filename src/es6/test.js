// export default {name: 'test'}
import matrix from './lib/matrix.js';
import tool from './lib/tool.js';

let items = matrix.makeMatrix();
let _arrs = items.map(item => item.map((v, i) => i));
let arrs = _arrs.map( arr => tool.shuffle(arr));
console.log(arrs);

let cell = tool.convertPosition(5, 6);
console.log(cell);
let box_arr = matrix.box_matrix(arrs, cell.rowIndex, cell.colIndex);
console.log(box_arr);
console.log(arrs[cell.rowIndex][cell.colIndex]);