// 数独库
// 数独游戏 工厂构建
// 这里需要实现 数独解决方案的生成  数独游戏盘的生成
import MakeSolution from '../lib/makeSolution.js';

export default class Shuduku {
	constructor () {
		// 生成数独解决方案
		const maker = new MakeSolution();
		maker.init();
		// 储存解决方案
		this.solutionMatrix = maker.matrix;
		
		/* 这样做的目的是方便后期检查 */
		// 储存被重置的数组
		// 这里我们使用map结构
		// 索引组成id => value
		this.puzzleMap = new Map();
	}

	// 生成棋盘数独
	// level 难度系数
	makePuzzle (level = 5) {
		this.puzzleMatrix = this.solutionMatrix.map((row, rowIndex) => {
			// 前面很多地方我们使用map方法都没有加return
			// 是因为箭头函数在执行单行代码时，默认将单行代码结果返回
			// 而这里我们使用{}时，就必须手动return 返回值
			return row.map((cell, colIndex) => {
				if (Math.random() * 9 < level) {
					this.puzzleMap.set(`${rowIndex}${colIndex}`, cell);
					return 0;
				} else {
					return cell;
				}
			});
		});
	}
}