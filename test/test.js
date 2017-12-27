/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// 9 * 9 二维基础数组生成 和 费雪耶兹排序随机排序
// 该模块返回的都是数组
exports.default = {

	//生成一个一维数组
	makeRow: function makeRow() {
		var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var array = new Array(9);
		array.fill(v);
		return array;
	},


	// 生成一个二维数组
	makeMatrix: function makeMatrix() {
		var _this = this;

		var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		// 注意这里我们为什么不采用上面的方法来生产二维数组呢？
		/*
  const array = new Array(9);
  array.fill(makeRow(v));
  return array;
   */
		// 如果我们按照上面方法生产一个二维数组，那么二维数组内的
		// 所有一维数组都将指向makeRow(v)运行一次后得到的数据
		// 这样的后果就是一旦其中一个一维数组发生变化，将导致所有的一维
		// 数组发生变化，这不是我们所希望的

		// 下面这样的做法，是每个一维数组都会通过运行makeRow()
		// 来得到一个新的数组（这里主要就是需要理解引用类型数据的运作机制）
		return Array.from({ length: 9 }, function () {
			return _this.makeRow(v);
		});
	},


	// 获取九宫格数组
	// matrix: 二维数组
	// row_index: 宫内第一个元素的第一维起始索引
	// col_index: 宫内第一个元素的第二维起始索引
	// 取值方式如下所示：
	// [（matri数组中的一部分）
	// 	[a,b,c],  [0,1,2
	// 	[1,2,3],  3,4,5
	// 	[o,p,q]   6,7,8]
	// ]
	// 通过该方法，以a元素的索引为起点，将a,b,c,1,2,3,o,p,q取出
	// 注意这里返回的是一个长度为9的数组
	boxMatrix: function boxMatrix(matrix) {
		var row_index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var col_index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

		// 保存九宫格数组
		var box_arr = [];
		// 保存九宫格中每个值对应的索引
		var box_index = [];
		// 保存每列的起始位置
		var _start_index = col_index;
		// 保存将要取值目标的位置
		var _target_index = col_index;
		for (var i = 0; i < 9; i++) {
			// 注意这里需要排除 i = 0（也就是在初始行中取完3个值以后才能进入下一列）
			// 如果不排除 i=0 ，那么一开始就会跳入到下一列进行取值，违背我们的初衷
			if (i != 0 && i % 3 == 0) {
				// 这里是保证每一行只取三个值
				// 取满三个值后转入下一列
				row_index += 1;
				_target_index = _start_index;
			}
			box_arr.push(matrix[row_index][_target_index]);
			box_index.push({ rowIndex: row_index, colIndex: _target_index });
			_target_index += 1;
		}
		// 返回我们最终的取值
		if (box_arr.length != 9) {
			console.info('box_matrix was failed');
			return null;
		} else {
			return { boxValue: box_arr, boxValueIndex: box_index };
		}
	}
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// 辅助数据检查工具
exports.default = {
	// 九宫格坐标换算
	// 这里的box_x / y是什么意思呢？
	// 就是指在九宫格中每个格的坐标位置 请参考box_position.png
	/*  
 ** 九宫格中每个宫的坐标是这样的
 **  (0, 0)   (1, 0)   (2, 0)
 **  
 **  (0, 1)   (1, 1)   (2, 1)
 **
 **  (0, 2)   (1, 2)   (2, 2)
  */
	// 下面box_x/y就代表每个宫的（x,y）坐标
	// 而这个宫坐标就是通过 9 * 9 这样的坐标来确定的
	// 如下面的排列，这就反应了9 * 9二维数组与九宫格的关系
	/*  0  1  2 | 3  4 5| 6 7 8
 **  1 (0,0) | (1,0) | (2,0)
 *   2       |       |
 *   ........................
 *   3 (0,1) | (1,1) | (1,2)
 *   4       |       |
 *   5       |       |
 *   ........................
 *   6 (0,2) | (1,2) | (2,2)
 *   7       |       |
 *   8       |       | 
  */
	// row_index col_index 是二维数组中的坐标（也就是索引值）
	// row_index 第一维数组的索引
	// col_index 第二维数组中的所有
	convertPosition: function convertPosition(row_index, col_index) {
		// box_x/y 用于储存九宫格中宫的坐标
		var box_x = Math.floor(col_index / 3);
		var box_y = Math.floor(row_index / 3);
		// 根据上面的宫坐标，接下来，我们需要确定宫中格子的坐标
		// 首要目标是确定一个格子的坐标
		// 需要注意这里的格子坐标，实际是指在二维数组中的索引
		// 如下面示意，这里我们展示其中一个宫中的数据
		/*
     （box_x, box_y） = (1, 2);
        宫坐标为（1，2）中的数据
  		-------------
  		| 0 | 1 | 2 |
  		-------------
  		| 3 | 4 | 5 |
  		-------------
  		| 6 | 7 | 8 |
  		-------------
   */
		// 我们需要确定0这个格在二维数组中的索引
		// 我们通过0这个格子的索引，就能确定这9个格子在二维数组中的索引
		// 通过该索引我们就能获取这个9个格子所拥有的值
		// 这样就方便检查工具，检查在一个宫中是否有重复的值
		var cell_x = box_x * 3;
		var cell_y = box_y * 3;
		// 注意我们需要将这里的x,y对应二维数组转换为索引
		// 第一维索引对应的是y坐标,第二维对应的是x坐标
		// cell_first 的row_index = cell_y, col_index = cell_x
		// 根据这个方法，我们就可以确定宫坐标为（1，2）中第一个格子
		// 在二维数组中的索引就是（3，6）
		// 第一维数组中的索引为3，第二维数组中的索引为6
		// ***【这里如果理解困难请参考box_positions.png】***

		// 这里返回的是一个对象
		// 该对象为 ’当前索引指向的值‘ 所在的’宫‘中第一个元素在9 * 9 二维数组中的 ’索引‘
		return { rowIndex: cell_y, colIndex: cell_x };
	},


	// 根据宫的索引值来获取宫的首个元素的索引值
	// box_index 为宫的索引值
	/*  0  1  2 | 3  4 5| 6 7 8
 **  1 ( 0 ) | ( 1 ) | ( 2 )
 *   2       |       |
 *   ........................
 *   3 ( 3 ) | ( 4 ) | ( 5 )
 *   4       |       |
 *   5       |       |
 *   ........................
 *   6 ( 6 ) | ( 7 ) | ( 8 )
 *   7       |       |
 *   8       |       | 
  */
	convertBox: function convertBox() {
		var box_index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var first_cell_col = box_index % 3 * 3;
		var first_cell_row = Math.floor(box_index / 3) * 3;
		return {
			rowIndex: first_cell_row,
			colIndex: first_cell_col
		};
	},


	// 获取二维数组中指定列的数值
	// matrix 二维数组
	// colIndex 指定的列
	getCol: function getCol(matrix, colIndex) {
		// 保存列中的数值
		var arr = [];
		for (var i = 0; i < 9; i++) {
			arr.push(matrix[i][colIndex]);
		};
		return arr;
	},

	/*
 ** Fisher-Yates 费雪耶兹随机置乱算法
 **
  */
	shuffle: function shuffle(array) {
		// 需要运算的次数，应该是array.length - 1
		// 因为最后一次不需要作任何运算，所以就不需要执行
		// 这里需要理解这种算法的特点才行
		var endIndex = array.length - 2;
		for (var i = 0; i <= endIndex; i++) {
			/*
    取得一个随机数
    注意随机的数据必须是当前遍历到的数据的后面的数据
    什么意思呢？
    a = [1,2,3,4,5]
    如果当前已经遍历到2这个数值
    那么随机取值就必须是在2后面的数据中随机抽取
    也就是只能在3，4，5中取得
    下面这个_r就是这个用意
   */
			// Math.random() * array.length
			// 这个取值范围就是 0 和 array.length 之间 但不包含array.length
			var _r = i + Math.floor(Math.random() * (array.length - i));
			// 将随机取得的值替换当前遍历的值
			// 这里我们通过解构来赋值
			var _ref = [array[_r], array[i]];
			array[i] = _ref[0];
			array[_r] = _ref[1];
		}
		return array;
	}
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tool = __webpack_require__(1);

var _tool2 = _interopRequireDefault(_tool);

var _matrix = __webpack_require__(0);

var _matrix2 = _interopRequireDefault(_matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 检查对象
exports.default = {

	// 检查数值在九宫内填写合法
	/* matrix 九宫二维数组
 ** n 需要填入的数值
 ** row_index 行索引值
 ** col_index 列索引值
 **/
	checkFillable: function checkFillable(matrix, n, row_index, col_index) {
		// 按行、按列、按宫来检查数据
		// 抽取行数据
		var row_arr = matrix[row_index];
		// 抽取列数据
		var col_arr = _tool2.default.getCol(matrix, col_index);
		// 抽取宫数据
		var box_arr = [];
		// 对象结构赋值
		// tool.convertPosition 返回的是 {rowIndex: xxx, colIndex: xxxx}

		var _tool$convertPosition = _tool2.default.convertPosition(row_index, col_index),
		    rowIndex = _tool$convertPosition.rowIndex,
		    colIndex = _tool$convertPosition.colIndex;
		// 这里也是对象结构赋值matrixTool.boxMatrix 返回 {boxValue:xxx, boxValueIndex:xx}


		var _matrixTool$boxMatrix = _matrix2.default.boxMatrix(matrix, rowIndex, colIndex),
		    boxValue = _matrixTool$boxMatrix.boxValue;

		if (boxValue) {
			box_arr = boxValue;
		} else {
			console.log('\u83B7\u53D6\u2018\u5BAB\u5185\u2019\u6570\u636E\u5931\u8D25\uFF0Cbox_obj: ' + box_obj);
		}

		for (var i = 0; i < 9; i++) {
			if (row_arr[i] == n || col_arr[i] == n || box_arr[i] == n) {
				return false;
			}
		}

		return true;
	},


	// 数独-检查-标记
	// array 一维数组
	checkArray: function checkArray(array) {
		var len = array.length;
		// 创建检查标记数组
		var marks = new Array(9);
		// 标记数组初始值都为true
		marks.fill(true);

		for (var i = 0; i < len - 1; i++) {
			var v = array[i];
			// 如果当前位置的标记为false
			// 那么跳过本次检查
			if (!marks[i]) {
				continue;
			}
			// 如果当前值为0 ， 那么为false
			// 注意，这里我们需要注意，数独中没填写的空位 0 
			if (v == 0) {
				marks[i] = false;
			}

			for (var j = i + 1; j < len; j++) {
				if (array[j] == v) {
					marks[i] = marks[j] = false;
				}
			}
		}

		return marks;
	}
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _matrix = __webpack_require__(0);

var _matrix2 = _interopRequireDefault(_matrix);

var _tool = __webpack_require__(1);

var _tool2 = _interopRequireDefault(_tool);

var _make = __webpack_require__(5);

var _make2 = _interopRequireDefault(_make);

var _checker = __webpack_require__(2);

var _checker2 = _interopRequireDefault(_checker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
// export default {name: 'test'}
var arr = [1, 2, 3, 4, 5, 8, 9, 7, 6];
console.log(arr);
console.log(_checker2.default.checkArray(arr));
var arr1 = [1, 2, 0, 3, 4, 0, 0, 8, 9];
console.log(arr1);
console.log(_checker2.default.checkArray(arr1));
var arr2 = [1, 1, 2, 0, 0, 3, 4, 5, 6];
console.log(arr2);
console.log(_checker2.default.checkArray(arr2));

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // 数据生成工具

// 计算工具

// 检查工具


var _matrix = __webpack_require__(0);

var _matrix2 = _interopRequireDefault(_matrix);

var _tool = __webpack_require__(1);

var _tool2 = _interopRequireDefault(_tool);

var _checker = __webpack_require__(2);

var _checker2 = _interopRequireDefault(_checker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数独，（随机计算出所有的格子应该填写的数字）
var Make = function () {
	function Make() {
		_classCallCheck(this, Make);

		// 九宫格二维数组
		this.matrix = null;
		// 9 * 9 索引数组表
		this.orders = null;
		// 是否执行成功
		this._isSuccess = false;
	}

	_createClass(Make, [{
		key: "init",
		value: function init() {
			while (!this._generator()) {
				console.log('do it');
			}
		}
	}, {
		key: "_generator",
		value: function _generator() {
			// 生成9 * 9 二维数组
			// 这里需要注意的是，每当数独生成失败就需要重置这个二维数组
			// 及实现清空操作，理解这一点也非常重要
			this.matrix = _matrix2.default.makeMatrix();
			// 建立随机索引数组
			// 其实这里可以理解为是matri的索引表
			// 这个索引只是被打乱了，使得后面能在matrix中得到一个随机值
			this.orders = _matrix2.default.makeMatrix().map(function (row) {
				return row.map(function (v, i) {
					return i;
				});
			}).map(function (row) {
				return _tool2.default.shuffle(row);
			});

			// 填入 1 - 9 
			for (var n = 1; n <= 9; n++) {
				if (!this._fillNumber(n)) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: "_fillNumber",
		value: function _fillNumber(n) {
			// 从第一行开始填写数字
			return this._fillRow(n, 0);
		}
	}, {
		key: "_fillRow",
		value: function _fillRow(n, row_index) {
			// 如果数字n在该行填写成功后，那么递归调用_fillRow()
			// 进行下一行中填写数字n
			// 最终需要将数字n，全部填入每一行，即row_index == 8
			// 当row_index > 8 就说明数字 n 全部填入成功
			if (row_index > 8) {
				return true;
			}

			// 调入二维数组
			// 这里其实就是给这个二维数值填值得过程
			// 需要注意的是，这里的原始数组，是通过matrix类生成的
			// 默认所有的值都为 0 ；
			var row = this.matrix[row_index];

			// 获取该行的中各元素的随机索引值，
			// 后面将根据该索引值取值 
			var orders = this.orders[row_index];

			for (var i = 0; i < 9; i++) {

				var col_index = orders[i];
				// 如果当前行中指定的位置已经填入数值
				// 那么跳过该位置
				if (row[col_index] != 0) {
					continue;
				}
				// 检查这个位置在‘列’ ‘行’和当前‘宫’中是否能填写
				if (!_checker2.default.checkFillable(this.matrix, n, row_index, col_index)) {
					continue;
				}

				row[col_index] = n;
				// 注意这里需要将递归写进循环体内
				// 这样作的目的，是为了确保下一行能正确填写的情况下，
				// 那么才能确定本次填写是足够正确的
				// 这里一是为了验证本次的填写是否能保证下一行能正确填写
				// 同时也执行了下一行的填写，
				// 这是一个非常巧妙的递归运用
				if (!this._fillRow(n, row_index + 1)) {
					row[col_index] = 0;
					continue;
				}
				return true;
			}
			// 该函数一直返回false
			// 除非row_index = 8
			return false;
		}
	}]);

	return Make;
}();

exports.default = Make;

/***/ })
/******/ ]);
//# sourceMappingURL=test.js.map
