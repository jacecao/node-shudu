// 辅助数据检查工具
export default {
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
	convertPosition (row_index, col_index) {
		// box_x/y 用于储存九宫格中宫的坐标
		const box_x = Math.floor(col_index / 3);
		const box_y = Math.floor(row_index / 3);
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
		const cell_x = box_x * 3;
		const cell_y = box_y * 3;
		// 注意我们需要将这里的x,y对应二维数组转换为索引
		// 第一维索引对应的是y坐标,第二维对应的是x坐标
		// cell_first 的row_index = cell_y, col_index = cell_x
		// 根据这个方法，我们就可以确定宫坐标为（1，2）中第一个格子
		// 在二维数组中的索引就是（3，6）
		// 第一维数组中的索引为3，第二维数组中的索引为6
		// ***【这里如果理解困难请参考box_positions.png】***

		// 这里返回的是一个对象
		// 该对象为 ’当前索引指向的值‘ 所在的’宫‘中第一个元素在9 * 9 二维数组中的 ’索引‘
		return {rowIndex: cell_y, colIndex: cell_x};
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
	convertBox (box_index = 0) {
		let first_cell_col = (box_index % 3) * 3;
		let first_cell_row = Math.floor(box_index / 3) * 3;
		return {
			rowIndex: first_cell_row, 
			colIndex: first_cell_col
		};
	},

	// 获取二维数组中指定列的数值
	// matrix 二维数组
	// colIndex 指定的列
	getCol (matrix, colIndex) {
		// 保存列中的数值
		let arr = [];
		for (let i = 0; i < 9; i++) {
			arr.push(matrix[i][colIndex]);
		};
		return arr;
	},
	/*
	** Fisher-Yates 费雪耶兹随机置乱算法
	**
	 */
	shuffle (array) {
		// 需要运算的次数，应该是array.length - 1
		// 因为最后一次不需要作任何运算，所以就不需要执行
		// 这里需要理解这种算法的特点才行
		const endIndex = array.length - 2;
		for (let i = 0; i <= endIndex; i++) {
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
			let _r = i + Math.floor( Math.random() * (array.length - i) );
			// 将随机取得的值替换当前遍历的值
			// 这里我们通过解构来赋值
			[array[i], array[_r]] = [array[_r], array[i]];
		}
		return array;
	}
}