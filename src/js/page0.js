import { inside } from "./utils";

export default class Page0 {
	static dom;
	static _stripes;

	constructor() {
		if (this instanceof Page0) {
			throw Error('A static class cannot be instantiated.');
		}
	}

	static init(element) {
		this.dom = element;

		let width = this.dom.querySelector('#thumbnail').clientWidth;
		let stripes = window.innerWidth < 1280 ? '31px' : '7.5rem';
		console.log(width, stripes);
		this.dom.querySelector('#scrolldown').style.left = `calc((100vw - ${stripes} - ${width}px) / 2)`;

		this._stripes = [...this.dom.querySelectorAll('.vertical-stripe-right')];
		this._stripes.push(this.dom.querySelector('#thumbnail'));
		this._stripes.reverse();
	}

	static onMouseMove(e) {
		let check = false;

		for (const stripe of this._stripes) {
			if (!check) {
				let polygon = [
					[stripe.querySelector('.bl').getBoundingClientRect().x, stripe.querySelector('.bl').getBoundingClientRect().y],
					[stripe.querySelector('.br').getBoundingClientRect().x, stripe.querySelector('.br').getBoundingClientRect().y],
					[stripe.querySelector('.tr').getBoundingClientRect().x, stripe.querySelector('.tr').getBoundingClientRect().y],
					[stripe.querySelector('.tl').getBoundingClientRect().x, stripe.querySelector('.tl').getBoundingClientRect().y],
				];

				check |= inside([e.x, e.y], polygon);
			}

			if (!check) stripe.style.setProperty('--offset', '0');
			else stripe.style.setProperty('--offset', '-1.1rem');
		}

		let leftStripe = this.dom.querySelector('.vertical-stripe-left');

		let polygon = [
			[leftStripe.querySelector('.bl').getBoundingClientRect().x, leftStripe.querySelector('.bl').getBoundingClientRect().y],
			[leftStripe.querySelector('.br').getBoundingClientRect().x, leftStripe.querySelector('.br').getBoundingClientRect().y],
			[leftStripe.querySelector('.tr').getBoundingClientRect().x, leftStripe.querySelector('.tr').getBoundingClientRect().y],
			[leftStripe.querySelector('.tl').getBoundingClientRect().x, leftStripe.querySelector('.tl').getBoundingClientRect().y],
		];

		if (inside([e.x, e.y], polygon)) {
			leftStripe.style.setProperty('--offset', '1.1rem');
		} else {
			leftStripe.style.setProperty('--offset', '0');
		}

		let topStripe = this.dom.querySelector('.vertical-stripe-top');

		polygon = [
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
		let width = this.dom.querySelector('#thumbnail').clientWidth;
		let full = (window.innerWidth - 120 - width) / 2;

		let leftStripe = this.dom.querySelector('.vertical-stripe-left');

		if (stepProgress === 0) leftStripe.classList.add('transition');
		else leftStripe.classList.remove('transition');

		leftStripe.style.setProperty('--offset', full * stepProgress + 'px');

		let topStripe = this.dom.querySelector('.vertical-stripe-top');

		if (stepProgress === 0) topStripe.classList.add('transition');
		else topStripe.classList.remove('transition');

		topStripe.style.setProperty('--offset', window.innerHeight * stepProgress + 'px');

		for (const stripe of this._stripes) {
			if (stepProgress === 0) {
				stripe.classList.add('transition');
				stripe.classList.remove('cancel-delay');
			}
			else {
				stripe.classList.remove('transition');
				stripe.classList.add('cancel-delay')
			}

			stripe.style.setProperty('--offset', -full * stepProgress + 'px');
		}


		this.dom.querySelector('#central').style.transform = `translate(0, ${-20 * stepProgress}rem)`;
		if(stepProgress === 0) this.dom.querySelector('#central').style.transform = '';

		this.dom.querySelector('#central').style.setProperty('--opacity', 1 - 2 * stepProgress + '');

		this.dom.querySelector('#scrolldown').style.setProperty('--opacity', 1 - 2 * stepProgress + '');
	}
}