import { inside } from "./utils";

export default class Page2 {
	static dom;

	constructor() {
		if (this instanceof Page2) {
			throw Error('A static class cannot be instantiated.');
		}
	}

	static init(element) {
		this.dom = element;
	}

	static onMouseMove(e) {
		let leftStripe = this.dom.querySelector('.vertical-stripe-left');
		let rightStripe = this.dom.querySelector('.vertical-stripe-right');
		let img1 = this.dom.querySelector('#img1');
		let img2 = this.dom.querySelector('#img2');
		let imgContainer = this.dom.querySelector('#img-container');
		let central = this.dom.querySelector('#central');
		let toHide = this.dom.querySelector('#to-hide');

		let leftPolygon = [
			[leftStripe.querySelector('.bl').getBoundingClientRect().x, leftStripe.querySelector('.bl').getBoundingClientRect().y],
			[leftStripe.querySelector('.br').getBoundingClientRect().x, leftStripe.querySelector('.br').getBoundingClientRect().y],
			[leftStripe.querySelector('.tr').getBoundingClientRect().x, leftStripe.querySelector('.tr').getBoundingClientRect().y],
			[leftStripe.querySelector('.tl').getBoundingClientRect().x, leftStripe.querySelector('.tl').getBoundingClientRect().y],
		];

		let rightPolygon = [
			[rightStripe.querySelector('.bl').getBoundingClientRect().x, rightStripe.querySelector('.bl').getBoundingClientRect().y],
			[rightStripe.querySelector('.br').getBoundingClientRect().x, rightStripe.querySelector('.br').getBoundingClientRect().y],
			[rightStripe.querySelector('.tr').getBoundingClientRect().x, rightStripe.querySelector('.tr').getBoundingClientRect().y],
			[rightStripe.querySelector('.tl').getBoundingClientRect().x, rightStripe.querySelector('.tl').getBoundingClientRect().y],
		];
		
		let img1Polygon = [
			[img1.querySelector('.bl').getBoundingClientRect().x, img1.querySelector('.bl').getBoundingClientRect().y],
			[img1.querySelector('.br').getBoundingClientRect().x, img1.querySelector('.br').getBoundingClientRect().y],
			[img1.querySelector('.tr').getBoundingClientRect().x, img1.querySelector('.tr').getBoundingClientRect().y],
			[img1.querySelector('.tl').getBoundingClientRect().x, img1.querySelector('.tl').getBoundingClientRect().y],
		];

		let img2Polygon = [
			[img2.querySelector('.bl').getBoundingClientRect().x, img2.querySelector('.bl').getBoundingClientRect().y],
			[img2.querySelector('.br').getBoundingClientRect().x, img2.querySelector('.br').getBoundingClientRect().y],
			[img2.querySelector('.tr').getBoundingClientRect().x, img2.querySelector('.tr').getBoundingClientRect().y],
			[img2.querySelector('.tl').getBoundingClientRect().x, img2.querySelector('.tl').getBoundingClientRect().y],
		];

		if (inside([e.x, e.y], leftPolygon)) {
			leftStripe.style.setProperty('--offset', '1.1rem');
		} else {
			leftStripe.style.setProperty('--offset', '0');
		}
		
		if (inside([e.x, e.y], rightPolygon)) {
			rightStripe.style.setProperty('--offset', '-1.1rem');
		} else {
			rightStripe.style.setProperty('--offset', '0');
		}

		if (inside([e.x, e.y], img1Polygon)) {
			img1.style.height = '95%';
			img1.style.transform = '';
			img2.style.height = '5%';
			imgContainer.style.setProperty('--offset', '160vh');
			rightStripe.style.setProperty('--offset', '-1.1rem');
			toHide.style.opacity = '0';
		} else if(inside([e.x, e.y], img2Polygon)) {
			img2.style.height = '95%';
			img1.style.transform = 'translate(75px, 0)';
			img1.style.height = '5%';
			imgContainer.style.setProperty('--offset', '160vh');
			rightStripe.style.setProperty('--offset', '-1.1rem');
			toHide.style.opacity = '0';
		} else {
			img1.style.height = '50%';
			img1.style.transform = 'translate(75px, 0)';
			img2.style.height = '50%';
			imgContainer.style.setProperty('--offset', '70vh');
			rightStripe.style.setProperty('--offset', '0');
			toHide.style.opacity = '1';
		}
	}

	static onRoll(step, stepProgress, position, totalProgress) {
		if(stepProgress === 0) {
			let margin = (window.innerHeight - this.dom.querySelector('#central').clientHeight) / 2;
			this.dom.querySelector('#central').style.marginTop = margin + 'px';
		}

		let leftStripe = this.dom.querySelector('.vertical-stripe-left');
		let rightStripe = this.dom.querySelector('.vertical-stripe-right');
		let img1 = this.dom.querySelector('#img1');
		let img2 = this.dom.querySelector('#img2');
		let imgContainer = this.dom.querySelector('#img-container');
		let toHide = this.dom.querySelector('#to-hide');

		img1.style.height = '50%';
		img1.style.transform = 'translate(75px, 0)';
		img2.style.height = '50%';
		imgContainer.style.setProperty('--offset', '70vh');
		rightStripe.style.setProperty('--offset', '0');
		toHide.style.opacity = '1';

		leftStripe.style.setProperty('--scale', '7.1');

		if (stepProgress === 0){
			leftStripe.classList.add('transition');
			rightStripe.classList.add('transition-all');
			imgContainer.classList.add('transition-all');
		} else {
			leftStripe.classList.remove('transition');
			rightStripe.classList.remove('transition-all');
			imgContainer.classList.remove('transition-all');
		}

		leftStripe.style.setProperty('--offset', window.innerWidth * Math.min(stepProgress, 1)  + 'px');

		rightStripe.style.setProperty('--offset', 90 * stepProgress + 'vh');
		imgContainer.style.setProperty('--toffset', 90 * stepProgress + 'vh');

		this.dom.querySelector('#central').style.setProperty('--offset', -20 * stepProgress + 'rem');
		this.dom.querySelector('#central').style.setProperty('--opacity', 1 - 2 * stepProgress + '');
	}
}