'use strict';

/*======================================
	Generator for squares event - start
======================================*/

// Functional Programming

(function () {
	var squares = document.querySelector('.squares'),
		btnClick = document.querySelector('.click'),
		btnResult = document.querySelector('.result'),
		btnReset = document.querySelector('.reset'),
		i = 1,
		squareNumber = 100;

	for (i; i <= squareNumber; i++) {
		squares.insertAdjacentHTML('afterbegin', '<div class="square" data-click="0"></div>');
	}

	var square = document.querySelectorAll('.square');

	square.forEach(function(el) {
		el.addEventListener('click', function() {
			var clickCounter = el.getAttribute('data-click');
			el.setAttribute('data-click', ++clickCounter);
		})
	})

	btnClick.addEventListener('click', function(e) {
		var click = new Event('click'),
			j = 0,
			k;

		for (j; j <= squareNumber; j++) {
			k = Math.round(Math.random() * 99);
			square[k].dispatchEvent(click);
		}		
	})

	btnResult.addEventListener('click', function() {
		square.forEach(function(el) {
			el.textContent = el.getAttribute('data-click');

			if (el.textContent >= 100) {
				el.style.backgroundColor = "#F50202";
			} else if (el.textContent < 100 && el.textContent >= 75) {
				el.style.backgroundColor = "#FC8505";
			} else if (el.textContent < 75 && el.textContent >= 50) {
				el.style.backgroundColor = "#FCCF05";
			} else if (el.textContent < 50 && el.textContent >= 25) {
				el.style.backgroundColor = "#FCF6A9";
			}
		})
	})

	btnReset.addEventListener('click', function() {
		square.forEach(function(el) {
			el.setAttribute('data-click', 0);
			el.style.backgroundColor = '#FFF';
			el.textContent = '';
		})
	})
})();
/*======================================
	Generator for squares event - end
======================================*/





/*======================================
	Admin functionality: add product to store - start
======================================*/

let Admin;

class AdminFunctionality {
	constructor () {
		this.init = () => {
			this.getElements();
			this.events();
			return this;
		};

		this.errorMessages = {
			productTitle: 'Required field. Product title must contain at least 1 character.',
			productSku: 'Required field. Product SKU must contain at least 1 character.',
			productPrice: 'Required field. Product price must be numeric value.',
		};

		this.events = () => {
			this.elements.productForm.addEventListener('submit', this.submitForm);
		};

		this.submitForm = (e) => {
			e.preventDefault();

			const pTitle = this.elements.productTitle,
				pSku = this.elements.productSku,
				pPrice = this.elements.productPrice,
				pDesc = this.elements.productDesc,
				pAvailability = this.elements.productAvailability,
				pList = this.elements.productsList,
				pForm = this.elements.productForm;

			this.getTrimmedValue(pTitle, pSku, pPrice);

			if (!this.validateFormValue([pTitle, pSku, pPrice], this.errorMessages)) { return };

			pAvailability.value = pAvailability.checked ? 'in stock' : 'out of stock';

			pPrice.value += "$";

			pList.insertAdjacentHTML('beforeend', `
				<tr>
					<th>${pSku.value}</th>
					<td>${pTitle.value}</td>
					<td>${pPrice.value}</td>
					<td>${pDesc.value}</td>
					<td>${pAvailability.value}</td>
				</tr>
			`);

			for (var i = 0; i < pForm.elements.length; i++) {
				if (pForm.elements[i].type == 'checkbox') {
					pForm.elements[i].checked = false;
				} else {
					pForm.elements[i].value = '';
				}
			}
		};

		/**
		* Get an element value without spaces from both sides
		* @param {object} - one object element or comma-separated list of objects elements
		*/
		this.getTrimmedValue = (...elements) => {
			elements.forEach((el, i) => {
				elements[i].value = elements[i].value.trim();
			})
		};

		/**
		* Validate a form fields values
		* @params {array} fields - array of the objects elements
		*         {object} errorMessages - error messages
		* @return {boolean} - is form valid or not
		*/
		this.validateFormValue = (fields, errorMessages) => {
			let isValid,
				input = {},
				errorMessage;

			fields.forEach((input, i) => {
				errorMessage = errorMessages[input.id];

				if ('productPrice' === input.id) {
					isValid = (!isNaN(input.value) && input.value) ? true : false;
				} else {
					isValid = input.value ? true : false;
				}

				if (!isValid && !input.parentElement.classList.contains('has-error')) {
					input.parentElement.insertAdjacentHTML('afterend', `
						<span class='${input.id} text-danger'>${errorMessage}</span>
					`);
					input.parentElement.classList.add('has-error');
				} else if (isValid && input.parentElement.classList.contains('has-error')) {
					const error = document.querySelector(`.${input.id}`);
					error.remove();
					input.parentElement.classList.remove('has-error');
				}
			})

			return isValid;
		};

		/**
		* Get element by its selector
		* @param {string} sel - element's selector
		* @return {object} - object element
		*/
		this.getElement = (sel) => {
			let el = {};

			if (sel.indexOf('#') === 0) {
				sel = sel.slice(sel.indexOf('#') + 1);
				el = document.getElementById(sel);
			} else {
				el = document.querySelector(sel)
			}

			return el;
		};
	}

	getElements () {
		this.elements = {
			productsList: this.getElement('#products-list'),
			productForm: this.getElement('#add-product-form'),
			productTitle: this.getElement('#productTitle'),
			productSku: this.getElement('#productSku'),
			productPrice: this.getElement('#productPrice'),
			productDesc: this.getElement('#productDesc'),
			productAvailability: this.getElement('input[name=pAvailability]'),
		}
	}
};

document.addEventListener('DOMContentLoaded', () => {
	Admin = new AdminFunctionality().init();
});
/*======================================
	Admin functionality: add product to store - end
======================================*/



// Admin functionality: add product to store
// Functional Programming

// (function() {
// 	var productsList = document.getElementById('products-list'),
// 		pForm = document.getElementById('add-product-form'),
// 		pTitle = document.getElementById('pTitle'),
// 		pSku = document.getElementById('pSKU'),
// 		pPrice = document.getElementById('pPrice'),
// 		pDesc = document.getElementById('pDesc'),
// 		pAvailability = document.querySelector('input[name=pAvailability]'),
// 		errors = [];

// 	function trimming() {
// 		for (var i = 0; i < arguments.length; i++) {
// 			arguments[i].value = arguments[i].value.trim();
// 		}
// 	}

// 	function validation(input, errorMessage) {
// 		var isValid;

// 		if (input.id == 'pPrice') {
// 			isValid = (!isNaN(input.value) && input.value) ? true : false;
// 		} else {
// 			isValid = input.value ? true : false;
// 		}

// 		if (!isValid && !input.parentElement.classList.contains('has-error')) {
// 			input.parentElement.insertAdjacentHTML('afterend', `
// 				<span class='${input.id} text-danger'>${errorMessage}</span>
// 			`);
// 			input.parentElement.classList.add('has-error');
// 			errors.push('error');
// 		} else if (isValid && input.parentElement.classList.contains('has-error')) {
// 			var error = document.querySelector(`.${input.id}`);
// 			error.remove();
// 			input.parentElement.classList.remove('has-error');
// 			errors.pop('error');
// 		}
// 	}

// 	pForm.addEventListener('submit', function(e) {
// 		e.preventDefault();

// 		trimming(pTitle, pSku, pPrice, pDesc);

// 		validation(pTitle, 'Required field. Product title must contain at least 1 character.');
// 		validation(pSku, 'Required field. Product SKU must contain at least 1 character.');
// 		validation(pPrice, 'Required field. Product price must be numeric value.');

// 		pAvailability.value = pAvailability.checked ? 'in stock' : 'out of stock';

// 		if (!errors.length) {
// 			pPrice.value += "$";

// 			productsList.insertAdjacentHTML('beforeend', `
// 				<tr>
// 					<th>${pSku.value}</th>
// 					<td>${pTitle.value}</td>
// 					<td>${pPrice.value}</td>
// 					<td>${pDesc.value}</td>
// 					<td>${pAvailability.value}</td>
// 				</tr>
// 			`);

// 			for (var i = 0; i < pForm.elements.length; i++) {
// 				if (pForm.elements[i].type == 'checkbox') {
// 					pForm.elements[i].checked = false;
// 				} else {
// 					pForm.elements[i].value = '';
// 				}
// 			}
// 		}
// 	})
// })();