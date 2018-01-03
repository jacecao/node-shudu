import 'babel-polyfill';
import Render from "./ui/render.js";
import Shuduku from './core/shuduku.js';

const data = new Shuduku();
data.makePuzzle();

const view = new Render({
	container: '#container',
	data: data.puzzleMatrix
});

// 初始化主视图
view.init();

// 窗口重置监听
window.addEventListener('resize', () => {
	// 执行视图尺寸重置，保证为一个正方形结构
	view.resize()
}, false);