// 检查对象
import tool from './tool.js';
import matrixTool from './matrixTool.js';

const checkerTool = {
	
	// 检查数值在九宫内填写合法
	/* matrix 九宫二维数组
	** n 需要填入的数值
	** row_index 行索引值
	** col_index 列索引值
	**/
	checkFillable (matrix, n, row_index, col_index) {
		// 按行、按列、按宫来检查数据
		// 抽取行数据
		let row_arr = matrix[row_index];
		// 抽取列数据
		let col_arr = tool.getCol(matrix, col_index);
		// 抽取宫数据
		let box_arr = [];
		// 对象结构赋值
		// tool.convertPosition 返回的是 {rowIndex: xxx, colIndex: xxxx}
		const {rowIndex, colIndex} = tool.convertPosition(row_index, col_index);
		// 这里也是对象结构赋值matrixTool.boxMatrix 返回 {boxValue:xxx, boxValueIndex:xx}
		const {boxValue} = matrixTool.boxMatrix(matrix, rowIndex, colIndex);
		
		if (boxValue) {
			box_arr = boxValue;
		} else {
			console.log(`获取‘宫内’数据失败，box_obj: ${box_obj}`);
		}

		for (let i = 0; i < 9; i++) {
			if (row_arr[i] == n || col_arr[i] == n || box_arr[i] == n) {
				return false;
			}
		}

		return true;
	},

	/*
	** 数独-检查-标记
	** array 一维数组
	** 这里我们使用的检查核心依然是一张表
	** 目前我们在制作数独游戏中已经有了2张数据表
	** 这两张数据表产生于make类
	** 1张是生成的数独二维数据表， 这张表将用于记录当前执行代码过程中生成的正确数独排序
	** 1张是生成上面的数独排序表时，我们所采用的随机序列表，通过该表来随机生成数独排序
	** 那么当前我们检查数组内的值是否符合数独游戏，那么需要生成一张新的表，用于记录用户
	** 填写的数据的正确和错误，这三张表都是一一对应的关系
	** checkArray就是用于组成这张表的
	*/
	checkArray (array) {
		const len = array.length;
		// 创建检查标记数组
		const marks = new Array(9);
		// 标记数组初始值都为true
		marks.fill(true);

		for (let i = 0; i < len - 1; i++) {
			let v = array[i];
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

			for (let j = i + 1; j < len; j++) {
				// 当数组中出现相等的值时
				// 那么都标记为false
				if (array[j] == v) {
					marks[i] = marks[j] =false;
				}
			}

		}

		return marks;

	}
}


class Checker {
	
	constructor (matrix) {
		this._matrix = matrix;
		this._matrixMarks = matrixTool.makeMatrix(true);
	}

	get matrix () {
		return this._matrix;
	}

	get matrixMarks () {
		return this._matrixMarks;
	}

	get isSuccess () {
		return this._success;
	}

	check () {
		// 检查行
		this.checkRow();
		// 检查列
		this.checkCol();
		// 检查宫
		this.checkBox();

		// 检查整个二维数组的标记
		// 这里需要注意数组的every()方法
		// 这是在ES5中新增的遍历方法
		// 常用于测试数组的所有元素是否都通过了指定函数的测试。
		// 如果有一个返回false,那么整个函数都将返回false
		// 如果所有为true, 那么返回true
		// 所以用在这里就非常合适
		this._success = this._matrixMarks.every(row => row.every(mark => mark));
		return this._success;
	}

	// 标记行
	checkRow () {
		for (let row_index = 0; row_index < 9; row_index ++) {
			// 取每一行的数组
			let row_arr = this._matrix[row_index];
			// 对每一行数组进行检查和标记
			let row_marks = checkerTool.checkArray(row_arr);
			// 将每一行的标记结果合并到matrixMarks二维数组中
			for (let col_index = 0; col_index < row_marks.length; col_index ++) {
				// matrixMarks原始值都为true
				// 这里如果在检查结果中有false,那么将false值写入matrixMarks对应的位置
				if (!row_marks[col_index]) {
					this._matrixMarks[row_index][col_index] = false;
				}
			}
		}
	}

	// 标记列
	checkCol () {
		for (let col_index = 0; col_index < 9; col_index ++) {
			// 用于存放列中的值
			let col_arr = [];
			// 循环去追
			for (let row_index = 0; row_index < 9; row_index ++) {
				// 将取得的值存入col_arr
				col_arr[row_index] = this._matrix[row_index][col_index];
			}
			// 检查和标记列
			let col_marks = checkerTool.checkArray(col_arr);
			// 将每列标记结果合并到matrixMarks中
			for (let row_i = 0; row_i < col_marks.length; row_i++) {
				if (!col_marks[row_i]) {
					this._matrixMarks[row_i][col_index] = false;
				}
			}
		}
	}

	// 标记宫
	checkBox () {
		for (let i = 0; i < 9; i++) {
			// 每个宫中第一个元素的坐标获取
			// convertBox返回的是一个记录宫第一个元素的坐标对象
			// 这里解构赋值
			let {rowIndex, colIndex} = tool.convertBox(i);
			// 这里根据宫的第一个坐标值，我们获取宫内所有的值和对应的坐标
			// 这里返回的依然是一个对象
			// boxValue 是一个数组，包含了当前宫内的数
			// boxValueIndex 是一个数组，元素为对象，记录了值对应在二维数组中的索引值
			let {boxValue, boxValueIndex} = matrixTool.boxMatrix(this._matrix, rowIndex, colIndex);
			// 标记宫内元素
			let box_marks = checkerTool.checkArray(boxValue);
			// 将宫内标记结果合并到matrixMarks中
			for (let j = 0; j < box_marks.length; j++) {
				if (!box_marks[j]) {
					// 当前标记为false时，找到当前值得索引
					// 需要注意的是，标记中的顺序和宫内取得的元素是一一对应的
					// 这里再次体现数据结构在程序中的重要性
					// 这里建立多张相互关联的表，理清各个表（也就是二维数组）之间的关系很重要
					let {rowIndex, colIndex} = boxValueIndex[j];
					this._matrixMarks[rowIndex][colIndex] = false;
				}
			}
		}
	}

}

export {
	checkerTool,
	Checker
}