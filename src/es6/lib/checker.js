// 检查对象
import tool from './tool.js';
import matrixTool from './matrix.js';
export default {
	
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


	// 数独-检查-标记
	// array 一维数组
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
				if (array[j] == v) {
					marks[i] = marks[j] =false;
				}
			}

		}

		return marks;

	}
}