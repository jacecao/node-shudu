// 文档结构渲染
export default class render {
	
	constructor (obj) {
		this.container = obj.container;
		this.data = obj.data;
	}

	// 创建HTML结构
	bulidHTML (data) {
		// array 为一个 9 * 9 的二维数组
		let html = '<table class="table is-bordered is-fullwidth"><tbody>';
		
		for (let i = 1; i <= data.length; i++) {
			// 第一纬数组遍历
			// 构建每一行起始结构
			if (i % 9 == 1) {
				html += '<tr>';
			}
			if (i % 9 == 3 || i % 9 == 6) {
				html += '<tr class="border-bottom">';
			}
			// 构建该行的单元格
			// 第二维遍历
			for (let j = 1; j <= data[i-1].length; j++) {
				if (j % 9 == 3 || j % 9 == 6) {
					html += `<td class="border-right" data-i="${i-1}" data-j="${j - 1}">${data[i-1][j - 1]}</td>`;
				} else {
					html += `<td data-i="${i-1}" data-j="${j - 1}">${data[i-1][j - 1]}</td>`;
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
		}else{
			console.error(`the ${ele} undefind, please check the element is exist`);
		}
	}

	// 初始化模块
	// 	container: html容器（css选择符号）
	// 	data: arrray (9*9) 九宫格二维数组
	init () {
		let ele = this.container;
		let data = this.data;
		this.renderHTML(ele, data);
	}

}