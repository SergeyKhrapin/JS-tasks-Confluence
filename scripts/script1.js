'use strict';

/*
* Constructor
* @params {number} max - maximum symbols number
*		  {string} textarea - id of the textarea element (without #)
*		  {string} symbolsEntered - id of the symbolsEntered element (without #)
*		  {string} symbolsRemaining - id of the symbolsRemaining element (without #)
* @return {object}
*/
function Сounter (max, textarea, symbolsEntered, symbolsRemaining) {
	this.symbolsMax = max;
	this.totalSymbols = 0;
    this.previousValue = '';
    this.isLimit = false;

    this.init = () => {
        this.textarea = document.getElementById(textarea);
        this.symbolsEntered = document.getElementById(symbolsEntered);
        this.symbolsRemaining = document.getElementById(symbolsRemaining);

        this.textarea.placeholder = `You can enter up to ${max} characters`;
  
        this.events();

        return this;
    };

    this.events = () => {
    	this.textarea.addEventListener('input', this.countSymbolsNumber, false);
    };

    this.countSymbolsNumber = () => {
		let	enteredText = this.textarea.value,
			symbolsEntered = this.symbolsEntered,
			symbolsRemaining = this.symbolsRemaining;

		if (enteredText.length > this.symbolsMax) {
			this.textarea.value = this.truncateString(enteredText, max);
			return;
    	}

    	symbolsEntered.textContent = enteredText.length;
		symbolsRemaining.textContent = this.symbolsMax - enteredText.length;

    	this.previousValue = enteredText;
    };

    this.truncateString = (string, limit) => {
    	return string.slice(0, max);
    };

    this.preventStringFromLimitExceeding = () => {
    	this.textarea.value = this.previousValue;
    };
}

let textCounter = new Сounter(20, 'textarea', 'symbolsEntered', 'symbolsRemaining').init();