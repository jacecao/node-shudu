module.exports = {
	
	//生成一个二维数组
	makeRow(v = 0) {
		const array = new Array(9);
		array.fill(v);
		return array;
	},

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
