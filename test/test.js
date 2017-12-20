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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _matrix = __webpack_require__(2);

var _matrix2 = _interopRequireDefault(_matrix);

var _tool = __webpack_require__(3);

var _tool2 = _interopRequireDefault(_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export default {name: 'test'}
var items = _matrix2.default.makeMatrix();
var _arrs = items.map(function (item) {
  return item.map(function (v, i) {
    return i;
  });
});
var arrs = _arrs.map(function (arr) {
  return _tool2.default.shuffle(arr);
});
console.log(arrs);

var cell = _tool2.default.convertPosition(5, 6);
console.log(cell);
var box_arr = _matrix2.default.box_matrix(arrs, cell.rowIndex, cell.colIndex);
console.log(box_arr);
console.log(arrs[cell.rowIndex][cell.colIndex]);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// 9 * 9 二维基础数组生成 和 费雪耶兹排序随机排序
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
	// row_index: 第一维起始索引
	// col_index: 第二维起始索引
	// 取值方式如下所示：
	// [（matri数组中的一部分）
	// 	[a,b,c],  [0,1,2
	// 	[1,2,3],  3,4,5
	// 	[o,p,q]   6,7,8]
	// ]
	// 通过该方法，以a元素的索引为起点，将a,b,c,1,2,3,o,p,q取出
	// 注意这里返回的是一个长度为9的数组
	box_matrix: function box_matrix(matrix) {
		var row_index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var col_index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

		var box_arr = [];
		// 保存每列的起始位置
		var _start_index = col_index;
		// 保存将要取值目标的位置
		var _target_index = col_index;
		for (var i = 0; i < 9; i++) {
			if (i != 0 && i % 3 == 0) {
				// 这里是保证每一行只取三个值
				// 取满三个值后转入下一列
				row_index += 1;
				_target_index = _start_index;
			}
			box_arr.push(matrix[row_index][_target_index]);
			_target_index += 1;
		}
		// 返回我们最终的取值
		if (box_arr.length != 9) {
			console.info('box_matrix was failed');
		} else {
			return box_arr;
		}
	}
};

/***/ }),
/* 3 */
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
		// box_position 用于储存九宫格中宫的坐标
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
		return { rowIndex: cell_y, colIndex: cell_x };
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

/***/ })
/******/ ]);
//# sourceMappingURL=test.js.map
