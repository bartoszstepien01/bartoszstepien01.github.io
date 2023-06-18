import { inside } from "./utils";

export default class Page5 {
	static dom;

	constructor() {
		if (this instanceof Page5) {
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

		let topStripe = this.dom.querySelector('.vertical-stripe-top');

		let polygon = [
			[topStripe.querySelector('.bl').getBoundingClientRect().x, topStripe.querySelector('.bl').getBoundingClientRect().y],
			[topStripe.querySelector('.br').getBoundingClientRect().x, topStripe.querySelector('.br').getBoundingClientRect().y],
			[topStripe.querySelector('.tr').getBoundingClientRect().x, topStripe.querySelector('.tr').getBoundingClientRect().y],
			[topStripe.querySelector('.tl').getBoundingClientRect().x, topStripe.querySelector('.tl').getBoundingClientRect().y],
		];

		if (inside([e.x, e.y], polygon)) {
			topStripe.style.setProperty('--offset', '1.1rem');
		} else {
			topStripe.style.setProperty('--offset', '0');
		}
	}

	static onRoll(step, stepProgress, position, totalProgress) {
	}
}