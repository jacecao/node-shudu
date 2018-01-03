// 数据生成工具
import matrixTool from "./matrixTool.js";
// 计算工具
import tool from "./tool.js";
// 检查工具
import {checkerTool} from "./checker.js";
// 生成数独，（随机计算出所有的格子应该填写的数字）
export default class MakeSolution {

	constructor () {
		// 九宫格二维数组
		this.matrix = null;
		// 9 * 9 索引数组表
		this.orders = null;
	}

	init () {
		while (!this._generator()) {
			console.log('do it');
		}
	}

	_generator () {
		// 生成9 * 9 二维数组
		// 这里需要注意的是，每当数独生成失败就需要重置这个二维数组
		// 及实现清空操作，理解这一点也非常重要
		this.matrix = matrixTool.makeMatrix();
		// 建立随机索引数组
		// 其实这里可以理解为是matri的索引表
		// 这个索引只是被打乱了，使得后面能在matrix中得到一个随机值
		this.orders = matrixTool.makeMatrix()
			.map( row => row.map( (v, i) => i ) )
			.map( row => tool.shuffle(row) );

		// 填入 1 - 9 
		for (let n = 1; n <= 9; n++) {
			if (!this._fillNumber(n)) {
				return false;
			}
		}
		return true;
	}

	_fillNumber (n) {
		// 从第一行开始填写数字
		return this._fillRow(n, 0);
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

		// 获取该行的中各元素的随机索引值，
		// 后面将根据该索引值取值 
		const orders = this.orders[row_index];


		for (let i = 0; i < 9; i++) {

			const col_index = orders[i];
			// 如果当前行中指定的位置已经填入数值
			// 那么跳过该位置
			if (row[col_index] != 0) {
				continue;
			}
			// 检查这个位置在‘列’ ‘行’和当前‘宫’中是否能填写
			if (!checkerTool.checkFillable(this.matrix, n, row_index, col_index)) {
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
}