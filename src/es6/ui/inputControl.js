// 输入框元素的操作
// 注意这里我们使用了HTML5新增的API
// classList 、 dataset
// 都是新增的DOM操作API
// 低版本浏览器不支持，如果使用低版本浏览器打开本应用就会出错
export default class InputControl {

	constructor (event="click") {
		// 保存输入按钮组
		this._input_ele = document.querySelector('#input-buttons');
		// 用于储存当前触发输入按钮的目标元素（也就是九宫格格子）
		this._target = null;
		// 用于储存输入按钮组尺寸
		this._input_ele_size = null;
		// 保存输入按钮触发事件类型，默认为click
		this._e = event;
		// 保存输入值
		this.value = null;
		// 输入按钮是否显示
		this.isOpen = false;
	}

	get _getClientSize () {
		// 获取输入组按钮尺寸
		return {
			width: this._input_ele.clientWidth,
			height: this._input_ele.clientHeight
		};
	}
	// 获取输入按钮的定位并显示
	position (target_ele) {
		if (this.isOpen) {
			this._input_ele.classList.remove('in');
		}
		// 将输入按钮组diaplay设为block
		// opacity 依然为0
		// 这样做的目的是为了执行_getClientSize()
		// 只有元素display非none时，我们才能获取其尺寸
		this._input_ele.classList.add('show');
		// 储存当前目标元素
		this._target = target_ele;
		// 获取目标点当前文档高度
		const _top = target_ele.offsetTop;
		// 获取目标点当前文档左边距
		const _left = target_ele.offsetLeft;
		// 获取目标点自己的大小（注 意这里目标值就是每个单元格，而每个单元格是等宽等高的）
		// 所以这里我们仅仅取一个值即可
		const target_width = target_ele.clientWidth;
		const target_height = target_ele.clientHeight;
		// 这里我们需要获取按钮组尺寸大小（按钮组大小是固定）
		// 这里我们做一个判断，判断当前对象是否保存了输入按钮组大小
		// 如果没有我们就取值，如果有就不再重复取值
		if (!this._input_ele_size) {
			this._input_ele_size = this._getClientSize;
		}
		const _ele_size = this._input_ele_size;
		// console.log(target_width, target_height);
		// 注意这里需要理解left和top的定位计算方式
		// 我们需要将输入按钮的中心点与当前目标点的中心重合
		// 这里建议画图理解这个关系
		const x = _left - (_ele_size.width - target_width) / 2;
		const y = _top - (_ele_size.height - target_height) / 2;

		this._input_ele.style.left = x + 'px';
		this._input_ele.style.top = y + 'px';
		// console.log(x, y);
		// 加入动画并显现元素
		this._input_ele.classList.add('in');
		this.isOpen = true;
	}

	hide () {
		// 隐藏输入按钮组
		this._input_ele.classList.remove('in');
		window.setTimeout(() => this._input_ele.classList.remove('show'), 400);
	}
	// 一个promise对象
	// 这里我们通过promise对象来返回这里轮盘输入的值
	// 如果我们直接访问该对象的value属性是无法获取到当前值
	// 因为只有点击事件发生后才会更新value属性
	// 而这一步却是一个异步操作，存在实践性
	// 所以在render模块执行该模块时，无法直接获取轮盘输入值
	// 这里也能显示出promise这妙处
	eventPromise () {
		return new Promise((resolve, reject) => {
			this._input_ele.addEventListener(this._e, (e) => {
				// 这里是指点击的数字按钮
				let input_button = e.target;
				// console.log(input_button);
				let input_data = input_button.dataset.value;
				// console.log(input_data);
				// 点击清空
				if (input_data == 0) {
					this._inputNull();
					resolve(this.value);
					return;
					// 点击标记按钮
				} else if (input_data == 'm') {
					console.log('mark');
					this._inputMark();
					resolve(false);
					return;
					// 点击非数字,直接隐藏输入轮盘
				} else if (input_data == undefined) {
					this.hide();
					return;
				}
				this._inputNumber(input_data);
				resolve(this.value);
			}, false);
		});
	}

	// 点击清空按钮
	_inputNull () {
		this._target.innerHTML = '';
		// 如果不存在标记
		if (!this._target.dataset.mark) {
			this._target.style.background = 'inherit';
		} 
		this.value = 0;
	}

	// 点击标记按钮
	_inputMark () {
		// 点击标记按钮
		// 如果标记已经存在那么就取消标记
		if (this._target.dataset.mark) {
			this._target.style.background = 'inherit';
			this._target.dataset.mark = '';
		} else {
			// 如果没有别标记那么添加标记
			this._target.style.background = '#ffdd57';
			this._target.dataset.mark = 'true';
		}
		this.hide();
	}


	// 点击输入按钮操作
	_inputNumber (data) {
		this.value = parseInt(data);
		this._target.innerHTML = data;
		this.hide();
	}

}