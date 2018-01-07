import 'babel-polyfill';
import Render from "./ui/render.js";
import Shuduku from './core/shuduku.js';

import InputControl from './ui/InputControl.js';
import GameInfo from './ui/gameInfo.js';

const data = new Shuduku();
// 生成迷盘数据
data.makePuzzle();

// 创建输入轮盘类
const inputControl = new InputControl();

// 创建视图
const view = new Render({
	container: '#container',
	data: data.puzzleMatrix
});

// 初始化主视图
view.init();
view.bind(inputControl);

// 获取答案
const resolve = document.querySelector('#resolve');
resolve.addEventListener('click', function () {
	console.log(data.solutionMatrix);
}, false);

// 检查棋盘
const check = document.querySelector('#check');
// 检查信息模块
const checkAndShow = new GameInfo();
check.addEventListener('click', function () {
	// 获取当前棋盘被隐藏为的数据（保存着那些值被转换为0）
	let puzzleMap = data.puzzleMap;
	// 获取当前用户填写的值
	let inputMap = view.inputMap;
	// 对值进行检查，同时对错误进行标记
	checkAndShow.check(puzzleMap, inputMap);
}, false);

// 重置棋盘
const reset = document.querySelector('#reset');
reset.addEventListener('click', function () {
	// 隐藏轮盘
	inputControl.hide();
	// 将新的数据迷盘注入视图
	view.injection(data.puzzleMatrix);
	// 重绘制棋盘
	view.init();
	// 绑定轮盘按钮
	view.bind(inputControl);
}, false);

// 重开一局
const rebuild = document.querySelector('#rebuild');
rebuild.addEventListener('click', function () {
	inputControl.hide();
	// 重新生成迷盘数据
	data.makePuzzle();
	// 将新的数据迷盘注入视图
	view.injection(data.puzzleMatrix);
	// 重绘棋盘
	view.init();
	// 绑定轮盘按钮
	view.bind(inputControl);
}, false);

// 窗口重置监听
window.addEventListener('resize', () => {
	// 执行视图尺寸重置，保证为一个正方形结构
	view.resize();
}, false);