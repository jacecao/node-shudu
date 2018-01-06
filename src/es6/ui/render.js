import {checkerTool} from '../lib/checker.js';

// 通过symbol值来创建静态变量
const mark_err = Symbol();
const table_html = Symbol();
const renderHTML = Symbol();

// 九宫格文档结构渲染
export default class Render {
	
	constructor (obj) {
		// 储存容器元素，html填充对象
		this.container = obj.container;
		// 记录生成的迷盘数据
		// puzzleMatrix
		this.injection(obj.data);
		// 当前九宫格是否渲染到页面
		this.render = false;
		// 当前九宫格的class
		this.tableClass = null;
		// 创建录入值得map数据
		// 在shuduku.js文件中，我们也保存了一个map值
		// this.puzzleMap = new Map();
		// 这个puzzleMap中储存的是当前棋盘的答案
		// 这里我们创建的map是用户给出棋盘缺省值得答案
		// 最后我们在检查过程中，只需要比对这两个map是否一样就能
		// 判断用户是否正确完成
		this.inputMap = new Map();
	}
	// 这一点非常重要
	// 数据注入，通过该方法将数据注入该类
	// 其实这里主要复制一份数据给类使用
	// 目的就是防止数据污染
	injection (data) {
		this.data = data.map((row, rowIndex) => {
			return row.map((col, colIndex) => col)
		})
	}

	// 创建HTML结构
	[table_html] (data) {
		// 生成一个随机的class
		const _class = 'shudu-' + Date.now();
		this.tableClass = '.' + _class;

		// array 为一个 9 * 9 的二维数组
		let html = `<table class="${_class} table is-bordered is-fullwidth"><tbody>`;
		
		for (let i = 1; i <= data.length; i++) {
			// 第一纬数组遍历
			// 构建每一行起始结构
			if (i % 9 == 1) {
				html += '<tr>';
			}
			// 判断是否需要加底边框
			// 为了生成九宫‘格’
			if (i % 9 == 3 || i % 9 == 6) {
				html += '<tr class="border-bottom">';
			}
			// 构建该行的单元格
			// 第二维遍历
			for (let j = 1; j <= data[i-1].length; j++) {
				// 如果数据中有等于0，那么就不显示任何数据
				let show_data = data[i-1][j-1] == 0 ? '' : data[i-1][j-1];
				// 对为空的方块添加class
				// 注意这里我们对值为空的格子添加一个特殊的class
				// index_xx 这个class用于方便标记有错误的数据
				let _class = data[i-1][j-1] == 0 ? `puzzle-cel index_${i-1}${j-1}` : `index_${i-1}${j-1}`;
				// 这里判断是否需要生成右边框
				// 这里目的同样是为了生成九宫‘格’
				if (j % 9 == 3 || j % 9 == 6) {
					html += `<td class="border-right ${_class}" data-row="${i-1}" data-col="${j - 1}">${show_data}</td>`;
				} else {
					html += `<td class="${_class}" data-row="${i-1}" data-col="${j - 1}">${show_data}</td>`;
				}
				// 加入每行的闭合标签
				if (j % 9 == 0) {
					html += '</tr>';
				}
			}
			

		}
		// 加入闭合标签
		html += 		
			"</tbody>"+
		"</table>";
		// 返回HTML结构
		return html;
	}

	// 渲染HTML结构
	[renderHTML] (ele, data) {
		const container = document.querySelector(ele);
		if (container) {
			const html = this[table_html](data);
			container.innerHTML = html;
			this.render = true;
		}else{
			console.error(`the ${ele} undefind, please check the element is exist`);
		}
	}

	// 保证为一个正方形结构
	resize () {
		if (this.render) {
			const ele = `${this.tableClass} td`;
			const cell = document.querySelector(ele);
			// 因为宽度是固定的，所以参考每格的宽度，来确定gap度
			// 保证每格都是正方形结构
			const width = window.getComputedStyle(cell).getPropertyValue('width');
			// 通过扩展运算符将 HTML片段 转换为数组
			const ele_arr = [...document.querySelectorAll(ele)];
			// console.log(ele_arr instanceof Array);
			ele_arr.forEach((ele, index) => {
				ele.style.height = width;
			});
		} else {
			console.info('请在使用init()方法或renderHTML()方法后执行');
		}
	}

	// 初始化模块
	// 	container: html容器（css选择符号）
	// 	data: arrray (9*9) 九宫格二维数组
	init () {
		let ele = this.container;
		let data = this.data;
		this[renderHTML](ele, data);
		// 清空填写数据
		this.inputMap.clear();
		this.resize();
	}

	// 输入按钮触发绑定
	bind (inputControl) {
		// 如果表格已经生成
		if (this.render) {
			const table = document.querySelector(this.tableClass);
			table.addEventListener('click' , (e) => {
				let target = e.target;
				// 只有为空的表格才能触发输入数组
				if (target.classList.contains('puzzle-cel')) {
					// 获取当前表格的数据索引
					let row = parseInt(target.dataset.row);
					let col = parseInt(target.dataset.col);
					// 操作数字输入轮盘
					inputControl.position(target);
					// 获取输入轮盘的值
					// 注意这里我们通过promise对象来返回轮盘输入的值
					inputControl.eventPromise().then((value) => {
						// 创建map数据
						// 首先判断当前value
						// 如果当前valueweifalse
						if (!value) {
							return;
						}
						// 添加输入组的map值
						this.inputMap.set(`${row}${col}`, value);
						// 更新棋盘数据
						this.data[row][col] = value;
						// todo 检查填写数据，对重复数据标记
						this.markRepeat(row, col);
					});
					
				}
			}, false);
		} else {
			console.log('the table not exist');
		}
	}

	markRepeat (row_index, col_index) {
		const matrix = this.data;
		// 检查重复函数返回的是一个记录了重置索引的数组
		// 数组元素是一个这样的对象
		// {row: row_index, col: col_index}
		const repeatIndexArr = checkerTool.checkRepeat(matrix, row_index, col_index);
		// 检查结果如果有重复值
		// 那么对页面添加提示css
		if (repeatIndexArr.length > 0) {
			let len = repeatIndexArr.length;
			for (let i = 0; i < len; i++) {
				let {row, col} = repeatIndexArr[i];
				// 根据索引获取元素
				// 每个格子的class我们添加了一个和索引有关的类
				// index_row[col]
				let ele = document.querySelector(`.index_${row}${col}`);
				this[mark_err](ele);
			}
		}
	}

	// 执行错误标记
	[mark_err] (ele) {
		// 这个类名是我们在_err_mark.scss文件中约定的
		ele.classList.add('err-mark');
		// 提示完后会自动消失
		setTimeout(() => {
			ele.classList.remove('err-mark');
		} ,2000);
	}


}