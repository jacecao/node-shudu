import 'babel-polyfill';
import Render from "./ui/render.js";
import Shuduku from './core/shuduku.js';
import InputControl from './ui/InputControl.js';

const data = new Shuduku();
// 生成迷盘数据
data.makePuzzle();

const inputControl = new InputControl();

const view = new Render({
	container: '#container',
	data: data.puzzleMatrix
});

// 初始化主视图
view.init();
view.bind(inputControl);

// 窗口重置监听
window.addEventListener('resize', () => {
	// 执行视图尺寸重置，保证为一个正方形结构
	view.resize();
}, false);