import { inside } from "./utils";

export default class Page1 {
	static dom;

	constructor() {
		if (this instanceof Page1) {
			throw Error('A static class cannot be instantiated.');
		}
	}

	static init(element) {
		this.dom = element;
	}

	static onMouseMove(e) {
		let leftStripe = this.dom.querySelector('.vertical-stripe-left');
		let rightStripe = this.dom.querySelector('.vertical-stripe-right');

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
	}

	static onRoll(step, stepProgress, position, totalProgress) {
		let full = (window.innerWidth - 0.3 * window.innerHeight) / 2;

		let leftStripe = this.dom.querySelector('.vertical-stripe-left');
		let rightStripe = this.dom.querySelector('.vertical-stripe-right');

		if (stepProgress === 0){
			leftStripe.classList.add('transition');
			rightStripe.classList.add('transition');
		} else {
			leftStripe.classList.remove('transition');
			rightStripe.classList.remove('transition');
		}

		leftStripe.style.setProperty('--offset', full * Math.min(stepProgress, 1)  + 'px');
		rightStripe.style.setProperty('--offset', -full * Math.min(stepProgress, 1) + 'px');

		this.dom.querySelector('#central').style.setProperty('--offset', -20 * stepProgress + 'rem');
		this.dom.querySelector('#central').style.setProperty('--opacity', 1 - 2 * stepProgress + '');
	}
}