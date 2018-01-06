// 数独库
// 数独游戏 工厂构建
// 这里需要实现 数独解决方案的生成  数独游戏盘的生成
import MakeSolution from '../lib/makeSolution.js';

/*
** 数独核心点
** 该类有两个重要的属性
** 1. puzzleMatrix  生成前端数独迷盘的数据
** 2. puzzleMap  记录当前生成迷盘部分的正确数据，这将用于检查前端填写是否正确的
**    参照数
** 该类一个方法
** makePuzzle(num[4-9]), 用于生成数独迷盘，如果该方法没有被执行，那么上面两个属性为空
**
 */
export default class Shuduku {
	constructor () {
		// 储存解决方案
		this.solutionMatrix = new Array();
		// 生成迷盘数组
		this.puzzleMatrix = new Array();
		/* 这样做的目的是方便后期检查 */
		// 储存被重置的数组
		// 这里我们使用map结构
		// [索引组成id => value]
		this.puzzleMap = new Map();
	}

	// 生成棋盘数独
	// level 难度系数
	makePuzzle (level = 5) {
		
		// 清空迷盘被隐藏的数据
		this.puzzleMap.clear();

		// 生成数独解决方案
		const maker = new MakeSolution();
		maker.init();
		// 储存解决方案
		this.solutionMatrix = maker.matrix;

		// 生成一个新的迷盘数据
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