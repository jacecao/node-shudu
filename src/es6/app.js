import 'babel-polyfill';
import Render from "./lib/render.js";
import data from './lib/data.js';

const view = new Render({
	container: '#container',
	data: data.makeMatrix()
});

view.init();