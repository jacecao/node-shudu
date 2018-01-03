// 9 * 9 二维基础数组生成 和 费雪耶兹排序随机排序
// 该模块返回的都是数组
export default {
	
	//生成一个一维数组
	makeRow(v = 0) {
		const array = new Array(9);
		array.fill(v);
		return array;
	},

	// 生成一个二维数组
	makeMatrix(v = 0) {
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
		return Array.from({length: 9}, () => this.makeRow(v));
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
	boxMatrix (matrix, row_index = 0, col_index = 0) {
		// 保存九宫格数组
		let box_arr = [];
		// 保存九宫格中每个值对应的索引
		let box_index = [];
		// 保存每列的起始位置
		const _start_index = col_index;
		// 保存将要取值目标的位置
		let _target_index = col_index;
		for (let i = 0; i < 9; i++) {
			// 注意这里需要排除 i = 0（也就是在初始行中取完3个值以后才能进入下一列）
			// 如果不排除 i=0 ，那么一开始就会跳入到下一列进行取值，违背我们的初衷
			if (i != 0 && i % 3 == 0) {
				// 这里是保证每一行只取三个值
				// 取满三个值后转入下一列
				row_index += 1;
				_target_index = _start_index;
			}
			box_arr.push(matrix[row_index][_target_index]);
			box_index.push({rowIndex: row_index, colIndex: _target_index});
			_target_index += 1;
		}
		// 返回我们最终的取值
		if (box_arr.length != 9) {
			console.info('box_matrix was failed');
			return null;
		} else {
			return {boxValue: box_arr, boxValueIndex: box_index};
		}
	}
}