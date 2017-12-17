// export default {name: 'test'}
const dataTool = require('./data.js');

let a = Array.from({length: 9}, (v, i) => i);
console.log(a);
dataTool.shuffle(a);
console.log(a);