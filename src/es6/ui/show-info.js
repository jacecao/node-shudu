/* 底部按钮控制 */
/* 该类所有私有属性我们都采用symbol来标记 */

// check reset rebuild
import {checkTool} from '../lib/checker.js';

const mark_err = Symbol();
const gameInfo = Symbol();
const showInfo = Symbol();

export default {
		
	checkShow (puzzleMap, inputMap) {
		let errIndex = checkTool.checkMap(puzzleMap, inputMap);
		// 如果有填写错误
		if (errIndex.length > 0) {
			this[gameInfo] = '抱歉！有错误存在';
			const len = errIndex.length;
			// 标记错误给用户
			for (let i = 0; i < len; i++) {
				let ele = document.querySelector(`.index_${i}`);
				this[mark_err](ele);
			}
		} else {
			this[gameInfo] = '厉害！点重建再来一局吧';
		}
		// 显示提示信息
		this[showInfo]();
	},
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