import {checkerTool} from '../lib/checker.js';

const mark_err = Symbol();
const message = Symbol();
const show_info = Symbol();

export default class GameInfo {
	constructor () {
		this[message] = 'hello!';
	}

	check (puzzleMap, inputMap) {
		const err_index = checkerTool.checkMap(puzzleMap, inputMap);
		if (err_index.length > 0) {
			
			this[message] = '抱歉！有错误哦';
			const len = err_index.length;
			for (let i = 0; i < len; i++) {
				let ele = document.querySelector(`.index_${err_index[i]}`);
				this[mark_err](ele);
			}
		} else {

			this[message] = '加油！再重建一局吧';
		}

		this[show_info]();
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

	[show_info] () {
		const ele = document.querySelector('.game-info');
		const span = document.querySelector('#message');

		span.innerHTML = this[message];

		ele.classList.add('show-info');
		// 提示完后会自动消失
		setTimeout(() => {
			ele.classList.remove('show-info');
		} ,2000);

	}
}