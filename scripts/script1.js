/*======================================
	Textarea symbols counting - start
======================================*/

// Functional Programming
var textarea         = document.getElementById('message-1'),
	symbolsEntered   = document.getElementById('symbols-entered-1'),
	symbolsRemaining = document.getElementById('symbols-remaining-1'),
	symbolsMax       = 20,
	currentValue     = '';

textarea.addEventListener('input', function() {
	if (this.value.length > symbolsMax) {
		this.value = currentValue;
		 
		this.onkeypress = function() {
	    	return false;
		}
	} else {
		this.onkeypress = function() {
	    	return true;
		}
	}

	symbolsEntered.textContent = textarea.value.length;
    symbolsRemaining.textContent = symbolsMax - textarea.value.length;

    currentValue = this.value;
});

// OOP
var textCounter = {
    symbolsMax: 20,
    textarea: null,
    symbolsEntered: null,
    symbolsRemaining: null,
    currentValue: '',
    init: function() {
        this.textarea = document.getElementById('message-2');
        this.symbolsEntered = document.getElementById('symbols-entered-2');
        this.symbolsRemaining = document.getElementById('symbols-remaining-2');
  
        this.events();
    },
    events: function() {
    	this.textarea.addEventListener('input', function() {
			if (this.value.length > textCounter.symbolsMax) {
				this.value = textCounter.currentValue;
				 
				this.onkeypress = function() {
			    	return false;
				}
			} else {
				this.onkeypress = function() {
			    	return true;
				}
			}

			textCounter.symbolsEntered.textContent = this.value.length;
		    textCounter.symbolsRemaining.textContent = textCounter.symbolsMax - this.value.length;

		    textCounter.currentValue = this.value;
    	})
    }
};

textCounter.init();

/*======================================
	Textarea symbols counting - end
======================================*/

// var h3 = document.querySelector('h3');
var p = document.querySelector('p');

document.addEventListener('click', function() {
	console.log(this);

	var h3 = document.querySelector('h3');

	h3.classList.toggle('red');
})

p.addEventListener('click', function() {
	var h3_ = document.createElement('h3');
	h3_.textContent = 'heading';
	this.after(h3_);
})
