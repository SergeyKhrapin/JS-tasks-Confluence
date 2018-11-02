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

	for (i; i <= squareNumber; i += 1) {
		squares.insertAdjacentHTML('afterbegin', '<div class="square" data-click="0"></div>');
	}

	var square = document.querySelectorAll('.square');

	square.forEach(function(el) {
		el.addEventListener('click', function() {
			var clickCounter = el.dataset.click;
			el.dataset.click++;
		})
	});

	btnClick.addEventListener('click', function(e) {
		var click = new Event('click'),
			j = 0,
			k;

		for (j; j <= squareNumber; j += 1) {
			k = Math.round(Math.random() * 99);
			square[k].dispatchEvent(click);
		}		
	}, false);

	btnResult.addEventListener('click', function() {
		square.forEach(function(el) {
			var clickNumber = el.dataset.click;

			el.textContent = clickNumber;

			if (clickNumber > 100) {
				el.style.backgroundColor = "#F50202";
			} else if (clickNumber > 75) {
				el.style.backgroundColor = "#FC8505";
			} else if (clickNumber > 50) {
				el.style.backgroundColor = "#FCCF05";
			} else if (clickNumber > 25) {
				el.style.backgroundColor = "#FCF6A9";
			}
		})
	}, false);

	btnReset.addEventListener('click', function() {
		square.forEach(function(el) {
			el.dataset.click = 0;
			el.style.backgroundColor = '#FFF';
			el.textContent = '';
		})
	}, false);
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
			productPrice: 'Required field. Product price must be a positive numeric value.',
		};

		this.events = () => {
			const fiels = [this.elements.productTitle, this.elements.productSku, this.elements.productPrice],
				  errorMessages = this.errorMessages;

			const callbackForInputEvent = (event) => {
				this.validateFormValue(fiels, errorMessages, event);
			};

			this.elements.productTitle.addEventListener('input', callbackForInputEvent);
			this.elements.productSku.addEventListener('input', callbackForInputEvent);
			this.elements.productPrice.addEventListener('input', callbackForInputEvent);
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
		* 		  {object} e - event object, optional parameter, is used when input event is invoked on each field
		* @return {boolean} - is form valid or not
		*/
		this.validateFormValue = (fields, errorMessages, e) => {
			let isValid = true,
				i = 0;
				
			const fieldsLength = fields.length;

			for (i; i < fieldsLength; i += 1) {
				const input = fields[i], 
					  errorMessage = errorMessages[input.id];

			 	if (e && e.target.id != input.id) {
					continue;
				}

				let isFieldValueValid;

				if ('productPrice' === input.id) {
					isFieldValueValid = (!isNaN(input.value) && input.value && input.value > 0) ? true : false;
				} else {
					isFieldValueValid = input.value ? true : false;
				}

				if (!isFieldValueValid && !input.parentElement.classList.contains('has-error')) {
					input.parentElement.insertAdjacentHTML('afterend', `
						<span class='${input.id} text-danger'>${errorMessage}</span>
					`);
					input.parentElement.classList.add('has-error');
				} else if (isFieldValueValid && input.parentElement.classList.contains('has-error')) {
					const error = document.querySelector(`.${input.id}`);
					error.remove();
					input.parentElement.classList.remove('has-error');
				}

				if (!isFieldValueValid) {
					isValid = false;					
				}				
			}

			return isValid;
		};

		this.getElements = () => {
			this.elements = {
				productsList: document.getElementById('products-list'),
				productForm: document.getElementById('add-product-form'),
				productTitle: document.getElementById('productTitle'),
				productSku: document.getElementById('productSku'),
				productPrice: document.getElementById('productPrice'),
				productDesc: document.getElementById('productDesc'),
				productAvailability: document.querySelector('input[name=pAvailability]'),
			}
		};
	}
};

document.addEventListener('DOMContentLoaded', () => {
	Admin = new AdminFunctionality().init();
});
/*======================================
	Admin functionality: add product to store - end
======================================*/