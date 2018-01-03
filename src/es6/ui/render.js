// 九宫格文档结构渲染
export default class Render {
	
	constructor (obj) {
		this.container = obj.container;
		this.data = obj.data;
		this.render = false;
		this.table = null;
	}

	// 创建HTML结构
	bulidHTML (data) {
		// 生成一个随机的class
		const _class = 'shudu-' + Date.now();
		this.table = '.' + _class;

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
				// 这里判断是否需要生成右边框
				// 这里目的同样是为了生成九宫‘格’
				if (j % 9 == 3 || j % 9 == 6) {
					html += `<td class="border-right" data-i="${i-1}" data-j="${j - 1}">${show_data}</td>`;
				} else {
					html += `<td data-i="${i-1}" data-j="${j - 1}">${show_data}</td>`;
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
	renderHTML (ele, data) {
		const container = document.querySelector(ele);
		if (container) {
			const html = this.bulidHTML(data);
			container.innerHTML = html;
			this.render = true;
		}else{
			console.error(`the ${ele} undefind, please check the element is exist`);
		}
	}

	// 保证为一个正方形结构
	resize () {
		if (this.render) {
			const ele = `${this.table} td`;
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
		this.renderHTML(ele, data);
		this.resize();
	}

}