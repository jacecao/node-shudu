// 数据生成工具
import matrix from "./matrix.js";
// 计算工具
import tool from "./tool.js";

// 生成数独，（随机计算出所有的格子应该填写的数字）
class Make {
	// array = 9 * 9 二维数组
	constructor (array) {
		this.matrix = matrix.makeMatrix();
	}

	_gennerator () {
		// 建立随机索引数组
		// 其实这里可以理解为是matri的索引表
		// 这个索引只是被打乱了，使得后面能吃matrix中得到一个随机值
		this.orders = matrix.makeMatrix()
			.map( row => row.amp( (v, i) => i ) )
			.map( row => tool.shuffle(row) );


		// 填入 1 - 9 
		for (let n = 1; n <= 9; n++) {
			this._fillNumber(n);
		}
	}

	_fillNumber (n) {
		// 从第一行开始填写数字
		this._fillRow(n, 0);
	}

	_fillRow (n, row_index) {
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
		const row = this.matrix[row_index];
		const orders = this.orders[row_index];


		for (let i = 0; i < 9; i++) {

			const col_index = orders[i];
			// 如果当前行中指定的位置已经填入数值
			// 那么跳过该位置
			if (row[col_index] != 0) {
				continue;
			}
			// 检查这个位置在列和当前‘宫’中是否能填写
			if (!checkFillable) {
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
			// 填写成功
			return true;
		}
		// 填写失败
		return false;
	}
}